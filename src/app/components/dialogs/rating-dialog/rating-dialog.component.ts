import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RatingService} from "../../../services/rating.service";
import {Rating} from "../../../models/rating";
import {clone} from "../../../services/clone";

@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  isBusy: boolean = false;
  valid: boolean = false;
  clonedRating: Rating;

  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly ratingService: RatingService) {
    this.clonedRating = clone(data.rating);
  }


  postClicked(): void {
    this.isBusy = true;

    if(this.data.rating.id == '-1')
      this.ratingService.postRating(this.data.rating)
        .then(() => this.dialogRef.close('post'))
        .finally(() => this.isBusy = false);
    else
      this.ratingService.editRating(this.data.rating)
        .then(() => this.dialogRef.close('post'))
        .finally(() => this.isBusy = false);


  }

  ngOnInit(): void {
  }

  isValid(): boolean {
    return this.valid && (this.data.rating.id != -1 && JSON.stringify(this.clonedRating) != JSON.stringify(this.data.rating));
  }

}
