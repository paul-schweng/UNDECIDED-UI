import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {SampleRating} from "../../services/SampleData";
import {RatingService} from "../../services/rating.service";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  ratings: Rating[] = [];
  private editedRatings: Rating[] = [];
  filters: string[] = ["ratings.filters.latest", "ratings.filters.highest", "ratings.filters.worst", "ratings.filters.likes", "ratings.filters.comments"];

  constructor(public dialog: MatDialog,
              private readonly ratingService: RatingService) { }

  ngOnInit(): void {
    this.ratingService.getMyRatings(this.filters[0].split(".").pop()!).then(
      (ratingList) => {this.ratings = ratingList.ratings!},
      ()=> this.ratings = [SampleRating, SampleRating, SampleRating, SampleRating, SampleRating] //TODO remove sample rating
    );
  }

  openRatingDialog(id: string = "-1") {

    let rating: Rating | undefined = this.editedRatings.filter(r => r.id === id).pop();

    console.log(rating);

    if(!rating && id !== "-1"){
      this.editedRatings.push(this.ratings.filter(r => r.id === id).pop()!);
      rating = this.editedRatings[this.editedRatings.length-1];
    }

    if (id == "-1" && !rating) {
      //TODO: uncomment
      //rating = {} as Rating;
      rating = JSON.parse(JSON.stringify(SampleRating)) as Rating;
      rating.id = id;
      this.editedRatings.push(rating);
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

      console.log(result);
    });



  }

  changeFilter(filter: MatSelectChange) {
    this.ratingService.getMyRatings(filter.value.split(".").pop()!).then(
      (ratingList) => {this.ratings = ratingList.ratings!},
      ()=> this.ratings = [SampleRating, SampleRating, SampleRating, SampleRating, SampleRating] //TODO remove sample rating
    );
  }
}
