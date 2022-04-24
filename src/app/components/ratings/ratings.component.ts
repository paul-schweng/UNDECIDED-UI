import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {EmptyRating, EmptyUser} from "../../services/SampleData";
import {RatingService} from "../../services/rating.service";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {clone} from "../../services/clone";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnDestroy, AfterViewInit, OnInit {

  scrollAmount: any;
  user: User = EmptyUser;
  editable: boolean = true;
  isLoadInProgress: boolean = false;

  @Input("user") set _user(user: User){
    this.user = user;
    this.editable = user.id == this.auth.iAmUser.id;

    this.ngAfterViewInit();
  }

  ratings: Rating[] = [];
  private editedRatings: Rating[] = [];
  filters: string[] = ["ratings.filters.latest", "ratings.filters.highest", "ratings.filters.worst", "ratings.filters.likes", "ratings.filters.comments"];
  private routeQueryParams$!: Subscription;
  currentFilter: string = this.filters[0];

  @ViewChildren('card') cards!: QueryList<ElementRef>;

  constructor(public dialog: MatDialog,
              private readonly ratingService: RatingService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService) {
  }

  ngOnInit() {

  }

  async ngAfterViewInit(){

    this.scrollAmount = document.querySelector('html')

    if(!this.user.id) this.user = this.auth.iAmUser;

    this.ratings = [];

    await this.init();
  }

  async init() {
    await this.partialLoading()
      .then( () => {

        this.routeQueryParams$ = this.route.queryParams.subscribe(params => {

          let ratingId = params['id'];
          if(ratingId)
            this.getRating(ratingId).then(
              rating => this.openRatingDialog(rating),
              () => this.router.navigate(['.'], {relativeTo: this.route})
            );

        });

      }).then(async () => {
        // time for UI to refresh
        await new Promise(res => setTimeout(res, 10))

        let count = 0;
        let MAX_TRIES = 2;
        let ratingsSize = this.ratings.length;

        do {
          await this.partialLoading();
          await new Promise(res => setTimeout(res, 10))
          console.log(this.ratings.length)

          if (ratingsSize == this.ratings.length && count > MAX_TRIES)
            break;
          else if (ratingsSize != this.ratings.length) {
            ratingsSize = this.ratings.length;
            count = 0;
          }
          count++;


        }while(this.areCardsInView() && (this.ratings.length < this.auth.iAmUser.ratingsNum!));

        console.log(this.cards.toArray())
      });
  }

  areCardsInView(): boolean {
    let isInView = false;
    for (let card of this.cards) {
      let rect = card.nativeElement.getBoundingClientRect();
      let topShown = rect.top >= 0 && rect.top <=window.innerHeight;
      let bottomShown = rect.bottom <= window.innerHeight;
      isInView = topShown;
      if(!isInView)
        return false;
    }
    return true;
  }

  isLastCardInView(): boolean {
    let card = this.cards.last;

    let rect = card.nativeElement.getBoundingClientRect();
    let topShown = rect.top >= 0 && rect.top <=window.innerHeight;
    let bottomShown = rect.bottom <= window.innerHeight;

    return topShown;
  }

  hasScrollbar(): boolean {
    return this.scrollAmount.scrollHeight > this.scrollAmount.offsetHeight+10;
  }


  private async getRating(id?: string): Promise<Rating> {

    if(!id)
      throw null;

    let rating: Rating | undefined = this.editedRatings.filter(r => r.id === id).pop();

    console.log('found edited rating?', rating ?? 'no');

    if(!rating && id !== "-1"){
      let r = this.ratings.filter(r => r.id == id).pop();
      if(r){
        this.editedRatings.push(clone(r));
        rating = this.editedRatings[this.editedRatings.length-1];
      }
    }

    if (id == "-1" && !rating) {
      rating = clone(EmptyRating); //TODO: change to EmptyRating
      rating.id = id;
      this.editedRatings.push(rating);
    }

    console.log('finally found rating?', rating ?? 'no');

    if(!rating)
      return await this.ratingService.getRating(id).then(
        r => {
          if(r.user?.id == this.auth.iAmUser.id)
            return r;
          else
            throw null;
          },() => {throw null;}
      );
    else
      return rating;

  }

  private openRatingDialog(rating: Rating) {
    const ratingDialog = this.dialog.open(RatingDialogComponent, {
      width: '90%',
      maxWidth: '',
      data: {rating: rating, editable: this.editable},
      autoFocus: false,
      panelClass: 'dialogFullSize'
    });

    ratingDialog.afterClosed().subscribe((result) => {
      console.log('rating', rating);
      console.log('edited ratings', this.editedRatings);
      console.log('ratings', this.ratings);
      console.log('action:', result);

      // if buttons are used to close dialog:
      if (rating && result) {
        this.editedRatings.splice(this.editedRatings.indexOf(rating), 1);
        console.log('edited ratings after delete', this.editedRatings);

        if(result == 'delete'){
          let idx = this.ratings.map(r => r.id).indexOf(rating.id);
          this.ratings.splice(idx, 1);
          this.auth.iAmUser.ratingsNum! -= 1;
        }

        if(result.id) {
          let idx = this.ratings.map(r => r.id).indexOf(result.id);
          if(idx == -1){
            this.ratings.unshift(result);
            this.auth.iAmUser.ratingsNum! += 1;
          }
          else
            this.ratings[idx] = result;
        }
      }

      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  changeFilter(filter?: MatSelectChange) {
    this.currentFilter = filter?.value ?? this.filters[0];
    if(filter)
      this.ratings = [];

    this.init();
  }


  // partial loading
  partialLoading() {

    let lastRating = this.ratings[this.ratings.length - 1];

    return this.ratingService.getMyRatings(this.currentFilter.split(".").pop()!, lastRating?.id || "0", this.ratings.length, this.user.id!).then(
      (ratingList) => {
        let temp = ratingList;
        for(let j in ratingList){
          for(let i in this.ratings){
            if(this.ratings[i].id == ratingList[j].id){
              temp.splice(Number(j), 1);
            }

          }

        }

        this.ratings.push(...temp);
        this.isLoadInProgress = false;
      });
  }

  ngOnDestroy(): void {
    this.routeQueryParams$.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    if(this.ratings.length >= this.user.ratingsNum! || this.isLoadInProgress)
      return;

    let height = this.scrollAmount.scrollHeight;


    const loop = async () => {

      while(this.isLastCardInView() && this.ratings.length < this.user.ratingsNum!){
        console.log('loaded ratings:', this.ratings.length);

        this.isLoadInProgress = true;
        await this.partialLoading();
      }

    }

    loop();

  }


  getImage(rating: Rating) {

    let image = '/api/img/rating/'+rating.id+'/0';
    let defaultImage = '/assets/img/defaultImage.webp';

    return rating.imageNum ? image : defaultImage;

  }

  load(src: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
      image.src = src;
    });
  }



}
