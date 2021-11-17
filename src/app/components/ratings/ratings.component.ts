import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NewRatingDialogComponent} from "../dialogs/new-rating-dialog/new-rating-dialog.component";
import {Rating} from "../../models/rating";
import {SampleRating} from "../../services/SampleData";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  private ratings: Rating[] = [];
  private editedRatings: Rating[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }


  openRatingDialog(id: string = "-1") {

    let rating: Rating | undefined = this.editedRatings.filter(r => r.id === id).pop();

    if(!rating && id !== "-1"){
      this.editedRatings.push(this.ratings.filter(r => r.id === id).pop()!);
      rating = this.editedRatings[this.editedRatings.length-1];
    }

    if (id=="-1" && !rating) {
      rating = SampleRating;
      this.editedRatings.push(rating);
    }

    const frontDialog = this.dialog.open(NewRatingDialogComponent, {
      width: '80%',
      height: '30%',
      data: rating,
      autoFocus: false
    });

    frontDialog.afterClosed().subscribe((result)=> {
      console.log(rating);
      console.log(this.editedRatings);
      console.log(this.ratings);

      if (rating && result === "cancel"){
        this.editedRatings.splice(this.editedRatings.indexOf(rating), 1)
      }
      console.log(result);
    });



  }

}
