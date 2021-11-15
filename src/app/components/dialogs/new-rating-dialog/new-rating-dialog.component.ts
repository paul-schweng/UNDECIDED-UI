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

  onCancel(): void {
    this.dialogRef.close();
  }

  postClicked(): void {
    this.isBusy = true;
    this.ratingService.postRating(this.data).finally(() => this.isBusy = false);
    console.log(this.data);
  }

  ngOnInit(): void {
  }

}
