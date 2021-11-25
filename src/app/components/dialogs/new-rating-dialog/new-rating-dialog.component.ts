import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Rating} from "../../../models/rating";
import {RatingService} from "../../../services/rating.service";

@Component({
  selector: 'app-new-rating-dialog',
  templateUrl: './new-rating-dialog.component.html',
  styleUrls: ['./new-rating-dialog.component.scss']
})
export class NewRatingDialogComponent implements OnInit {

  isBusy: boolean = false;

  constructor(public dialogRef: MatDialogRef<NewRatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Rating,
              private readonly ratingService: RatingService) {

  }


  postClicked(): void {
    this.isBusy = true;

    if(this.data.id == '-1')
      this.ratingService.postRating(this.data)
        .then(() => this.dialogRef.close('post'))
        .finally(() => this.isBusy = false);
    else
      this.ratingService.editRating(this.data)
        .then(() => this.dialogRef.close('post'))
        .finally(() => this.isBusy = false);


  }

  ngOnInit(): void {
  }

}
