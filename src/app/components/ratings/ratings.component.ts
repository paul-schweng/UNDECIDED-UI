import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {EmptyRating, SampleRating} from "../../services/SampleData";
import {RatingService} from "../../services/rating.service";
import {MatSelectChange} from "@angular/material/select";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit, OnDestroy {

  ratings: Rating[] = [];
  private editedRatings: Rating[] = [];
  filters: string[] = ["ratings.filters.latest", "ratings.filters.highest", "ratings.filters.worst", "ratings.filters.likes", "ratings.filters.comments"];
  private routeQueryParams$: Subscription;

  constructor(public dialog: MatDialog,
              private readonly ratingService: RatingService,
              private route: ActivatedRoute,
              private router: Router) {
    this.routeQueryParams$ = route.queryParams.subscribe(params => {
      if (params['id'])
        this.openRatingDialog(params['id']);
      else
        this.router.navigate(['.'], {relativeTo: this.route});
    });
  }

  ngOnInit(): void {
   this.changeFilter();
  }

  private openRatingDialog(id: string) {

    let rating: Rating | undefined = this.editedRatings.filter(r => r.id === id).pop();

    console.log(rating);

    if(!rating && id !== "-1"){
      let r = this.ratings.filter(r => r.id === id).pop();
      console.log(r);
      if(r){
        this.editedRatings.push(r);
        rating = this.editedRatings[this.editedRatings.length-1];
      }
    }

    if (id == "-1" && !rating) {
      //TODO: uncomment
      rating = EmptyRating;
      //rating = JSON.parse(JSON.stringify(SampleRating)) as Rating;
      rating.id = id;
      this.editedRatings.push(rating);
    }

    if(!rating){
      this.router.navigate(['.'], {relativeTo: this.route});
      return;
    }


    const frontDialog = this.dialog.open(RatingDialogComponent, {
      width: '90%',
      data: {rating: rating, editable: true},
      autoFocus: false
    });

    frontDialog.afterClosed().subscribe((result)=> {
      console.log(rating);
      console.log(this.editedRatings);
      console.log(this.ratings);

      // if buttons are used to close dialog:
      if (rating && result) {
        this.editedRatings.splice(this.editedRatings.indexOf(rating), 1)
      }
      this.router.navigate(['.'], {relativeTo: this.route});

      console.log(result);
    });



  }

  changeFilter(filter?: MatSelectChange) {
    let value = filter?.value || this.filters[0];
    this.ratingService.getMyRatings(value.split(".").pop()!).then(
      (ratingList) => {this.ratings = ratingList},
      ()=> this.ratings = [SampleRating, SampleRating, SampleRating, SampleRating, SampleRating] //TODO remove sample rating
    );
  }

  ngOnDestroy(): void {
    this.routeQueryParams$.unsubscribe();
  }
}
