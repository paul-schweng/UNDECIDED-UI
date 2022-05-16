import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Rating} from "../../../models/rating";
import {User} from "../../../models/user";
import {SampleRating, SampleUser} from "../../../services/SampleData";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {SearchResults} from "../../../models/search-results";
import {RatingDialogComponent} from "../../dialogs/rating-dialog/rating-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  isLoadInProgress: boolean = false;
  loadedEverything: boolean = false;
  @ViewChildren('card', {read: ElementRef}) cards!: QueryList<ElementRef>;

  results: any = []

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly ratingService: RatingService,
              private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.results = [SampleUser, SampleRating];


    this.activatedRoute.params.subscribe(params => {
      if(!params?.query)
        return;

      this.results = [];
      this.loadedEverything = false;
      this.onScroll();
    })

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      let id = params.id;
      if(id){
        this.getRating(id).then(r => {
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
      this.router.navigate(['.'], {relativeTo: this.activatedRoute});
    })
  }


  getImage(rating: Rating) {

    let image = '/api/img/rating/'+rating.id+'/0';
    let defaultImage = '/assets/img/defaultImage.webp';

    return rating.imageNum ? image : defaultImage;

  }


  partialLoading() {

    this.isLoadInProgress = true;

    let lastRating = this.results[this.results.length - 1];

    let query = this.activatedRoute.snapshot.params.query;

    let loadedRatings = this.results.filter((r: any) => r.modelType === 'rating').length
    let loadedUsers = this.results.filter((r: any) => r.modelType === 'user').length

    //console.log(this.activatedRoute.snapshot.params)

    return this.searchService.getSearchResults(query, loadedRatings, loadedUsers).then(results => {
      this.results.push(...results);
    })
      .finally(() => this.isLoadInProgress = false);
  }


  isLastCardInView(): boolean {
    if(!this.cards?.last)
      return true;

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


    const loop = async () => {

      while(this.isLastCardInView()){
        console.log('loaded ratings:', this.results.length);

        loadedRatings = this.results.length;

        await this.partialLoading();
        if(loadedRatings == this.results.length)
          counter++;

        if(counter >= MAX_LOOPS){
          this.loadedEverything = true;
          break;
        }
      }
    }
    loop();
  }


}
