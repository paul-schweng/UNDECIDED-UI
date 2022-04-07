import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {EmptyRating} from "../../services/SampleData";
import {RatingService} from "../../services/rating.service";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {clone} from "../../services/clone";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit, OnDestroy {

  ratings: Rating[] = [];
  private editedRatings: Rating[] = [];
  filters: string[] = ["ratings.filters.latest", "ratings.filters.highest", "ratings.filters.worst", "ratings.filters.likes", "ratings.filters.comments"];
  private routeQueryParams$!: Subscription;
  currentFilter: string = this.filters[0];

  constructor(public dialog: MatDialog,
              private readonly ratingService: RatingService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
   this.changeFilter()
     .then( () => {

       this.routeQueryParams$ = this.route.queryParams.subscribe(params => {

         this.getRating(params['id']).then(
           rating => this.openRatingDialog(rating),
           () => this.router.navigate(['.'], {relativeTo: this.route})
           );

       });

     });

   // TODO: delete this block ---
   new Promise(res=>{
     setTimeout(res, 3000)
   }).then(()=>{
     this.changeFilter()
   })
   // -------

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
        r => {return r},
        () => {throw null;}
      );
    else
      return rating;

  }

  private openRatingDialog(rating: Rating) {
    const ratingDialog = this.dialog.open(RatingDialogComponent, {
      width: '90%',
      maxWidth: '',
      data: {rating: rating, editable: true},
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
        }

        if(result.id) {
          let idx = this.ratings.map(r => r.id).indexOf(result.id);
          this.ratings[idx] = result;
        }
      }

      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  // partial loading
  changeFilter(filter?: MatSelectChange) {
    this.currentFilter = filter?.value ?? this.filters[0];
    let lastRating = this.ratings[this.ratings.length - 1];

    return this.ratingService.getMyRatings(this.currentFilter.split(".").pop()!, lastRating?.id || "0").then(
      (ratingList) => {
        for(let r2 of ratingList){
          for(let r1 of this.ratings){
            if(r1.id == r2.id)
              r1 = r2;
          }
          this.ratings.push(r2);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeQueryParams$.unsubscribe();
  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    console.log("lol")
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
    }
  }
}
