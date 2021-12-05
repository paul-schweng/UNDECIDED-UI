import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {EmptyRating, SampleRating} from "../../services/SampleData";
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
  }

  private async getRating(id?: string): Promise<Rating> {

    if(!id)
      throw null;

    let rating: Rating | undefined = this.editedRatings.filter(r => r.id === id).pop();

    console.log('found edited rating?', rating);

    if(!rating && id !== "-1"){
      let r = this.ratings.filter(r => r.id == id).pop();
      if(r){
        this.editedRatings.push(clone(r));
        rating = this.editedRatings[this.editedRatings.length-1];
      }
    }

    if (id == "-1" && !rating) {
      rating = clone(EmptyRating);
      //rating = JSON.parse(JSON.stringify(SampleRating)) as Rating;
      rating.id = id;
      this.editedRatings.push(rating);
    }

    console.log('finally found rating?', rating);

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

        if(result == 'delete')
          this.ratings.splice(this.ratings.indexOf(rating), 1);
      }

      this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  changeFilter(filter?: MatSelectChange) {
    let value = filter?.value ?? this.filters[0];
    return this.ratingService.getMyRatings(value.split(".").pop()!).then(
      (ratingList) => {this.ratings = ratingList},
      ()=> this.ratings = [SampleRating, SampleRating, SampleRating, SampleRating, SampleRating] //TODO remove sample rating
    );
  }

  ngOnDestroy(): void {
    this.routeQueryParams$.unsubscribe();
  }

}
