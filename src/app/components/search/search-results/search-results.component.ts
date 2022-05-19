import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Rating} from "../../../models/rating";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {RatingDialogComponent} from "../../dialogs/rating-dialog/rating-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RatingService} from "../../../services/rating.service";
import {waitFor} from "../../../services/waitFor";
import {distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  isLoadInProgress: boolean = false;
  loadedEverything: boolean = false;
  isLoadAllowed: boolean = true;
  isBusy: boolean = false;
  timeoutQuery: number = 0;

  @ViewChildren('card', {read: ElementRef}) cards!: QueryList<ElementRef>;

  query: string = '';
  results: any = []

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly ratingService: RatingService,
              private readonly searchService: SearchService) { }

  ngOnInit(): void {
    // this.results = [SampleUser, SampleRating];

    this.searchService.filters.subscribe(() => {
      this.changedQuery(this.query);
    })

    this.activatedRoute.queryParamMap.pipe(
        map(params => params.get('q')),
        distinctUntilChanged()
      ).subscribe(query => {
        this.changedQuery(query);
      });


    this.activatedRoute.queryParamMap.pipe(
      map(params => params.get('id')),
      distinctUntilChanged()
    ).subscribe(ratingId => {
      // console.log(ratingId)

      if(ratingId != null){
        this.getRating(ratingId).then(r => {
          if(r)
            this.openRating(r);
        });
      }
    });

  }


  getRating(id: string): Promise<any> {
    let idx = this.results.findIndex((r: any) => r.id === id);

    if(idx != -1)
      return new Promise(resolve => resolve(this.results[idx]));

    return this.ratingService.getRating(id).then(
      r => {return r},
      () => {throw null;}
    );
  }


  openRating(rating: Rating){
    let ratingDialog = this.dialog.open(RatingDialogComponent, {
      width: '90%',
      maxWidth: '',
      data: {rating: rating, editable: false},
      autoFocus: false,
      panelClass: 'dialogFullSize'
    });

    ratingDialog.afterClosed().subscribe(() => {
      this.router.navigate([], {queryParams: {id: null}, queryParamsHandling: "merge"});
    })
  }


  getImage(rating: Rating) {

    let image = '/api/img/rating/'+rating.id+'/0';
    let defaultImage = '/assets/img/defaultImage.webp';

    return rating.imageNum ? image : defaultImage;

  }


  partialLoading() {

    this.isLoadInProgress = true;


    let loadedRatings = this.results.filter((r: any) => r.modelType === 'rating').length
    let loadedUsers = this.results.filter((r: any) => r.modelType === 'user').length

    //console.log(this.activatedRoute.snapshot.params)

    return this.searchService.getSearchResults(this.query, loadedRatings, loadedUsers).then(results => {
      if(this.isLoadAllowed)
        this.results.push(...results);
    })
      .finally(() => {
        // await new Promise(res => setTimeout(res, 1000));
        this.isLoadInProgress = false
        this.isBusy = false;
      });
  }


  isLastCardInView(): boolean {
    if(!this.cards?.last)
      return true;

    if(this.cards.length != this.results.length)
      return false;


    let card = this.cards.last;

    let rect = card.nativeElement.getBoundingClientRect();
    let topShown = rect.top >= 0 && rect.top <=window.innerHeight;
    let bottomShown = rect.bottom <= window.innerHeight;

    return topShown;
  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {

    if(this.isLoadInProgress || this.loadedEverything)
      return;

    //let height = this.scrollAmount.scrollHeight;

    let counter = 0;
    let MAX_LOOPS = 2;
    let loadedRatings;

    // console.log("inside scroll")

    this.isLoadAllowed = true;

    const loop = async () => {

      while(this.isLastCardInView() && this.isLoadAllowed){
        loadedRatings = this.results.length;

        await this.partialLoading();

        console.log('loaded results:', this.results.length);

        if(loadedRatings == this.results.length)
          counter++;

        if(counter >= MAX_LOOPS){
          this.loadedEverything = true;
          console.log("breaking")
          break;
        }

        // wait for view to update
        await new Promise(res => setTimeout(res, 10))
      }
    }

    loop();
  }


  clickedRating(id: string) {
    this.router.navigate([], {queryParams: {id: id}, queryParamsHandling: "merge"})
  }


  changedQuery(query: string | null) {
    if(this.timeoutQuery){
      clearTimeout(this.timeoutQuery);
      this.timeoutQuery = 0;
    }

    if (!this.timeoutQuery && query !== null) {
      // console.log("about to load")
      this.loadedEverything = false;
      this.isBusy = true;
      this.isLoadAllowed = false;

      this.results = [];

      this.timeoutQuery = setTimeout(async () => {
        // console.log("inside timeout")
        //await new Promise(res => setTimeout(res, 50))

        // await new Promise(res => setTimeout(res, 100));
        // console.log("after sleep")
        await waitFor(() => !this.isLoadInProgress)

        this.query = query;
        this.onScroll();
        this.timeoutQuery = 0;
      }, 500);

    }
  }


}
