import {AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {RatingService} from "../../services/rating.service";
import {Rating} from "../../models/rating";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  ratings: Rating[] = []; //new Array(5).fill(clone(SampleRating));

  isLoadInProgress: boolean = false;
  loadedEverything: boolean = false;
  @ViewChildren('card', {read: ElementRef}) cards!: QueryList<ElementRef>;

  constructor(private ratingService: RatingService) { }

  ngAfterViewInit(): void {
    this.onScroll();
  }


  partialLoading() {

    this.isLoadInProgress = true;

    let lastRating = this.ratings[this.ratings.length - 1];

    return this.ratingService.getRatingsOfFollowing(lastRating?.id || "0")
      .then(ratingList => {
        this.ratings.push(...ratingList);
      })
      .finally(() => this.isLoadInProgress = false);
  }


  areLastCardsInView(): boolean {
    if(!this.cards?.last)
      return true;

    if(this.cards.length != this.ratings.length)
      return false;

    let cards = this.cards.toArray().slice(-4);

    for (let card of cards) {
      let rect = card.nativeElement.getBoundingClientRect();
      let topShown = rect.top >= 0 && rect.top <=window.innerHeight;
      let bottomShown = rect.bottom <= window.innerHeight;
      if(topShown)
        return true;
    }

    return false;
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

      while(this.areLastCardsInView()){
        console.log('loaded ratings:', this.ratings.length);

        loadedRatings = this.ratings.length;

        await this.partialLoading();
        if(loadedRatings == this.ratings.length)
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
