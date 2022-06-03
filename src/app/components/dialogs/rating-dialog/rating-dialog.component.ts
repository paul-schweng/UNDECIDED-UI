import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RatingService} from "../../../services/rating.service";
import {Rating} from "../../../models/rating";
import {clone} from "../../../services/clone";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  isBusy: boolean = false;
  valid: boolean = false;
  clonedRating: Rating;
  edit: boolean = false;


  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private readonly ratingService: RatingService,
              public dialog: MatDialog) {
    this.clonedRating = clone(data.rating);
    this.edit = data.edit || data.rating.id == '-1';
  }

  postClicked(): void {
    this.isBusy = true;

    if(this.data.rating.id == '-1')
      this.ratingService.postRating(this.data.rating)
        .then((resRating) => this.dialogRef.close(resRating))
        .finally(() => this.isBusy = false);
    else
      this.ratingService.editRating(this.data.rating)
        .then((resRating) => this.dialogRef.close(resRating))
        .finally(() => this.isBusy = false);
  }

  ngOnInit(): void {
  }

  isValid(): boolean {
      return this.valid && JSON.stringify(this.clonedRating) != JSON.stringify(this.data.rating);
  }

  deleteClicked() {
    const deleteRatingDialog = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: {content: 'dialog.delete.rating'}
    });

    deleteRatingDialog.beforeClosed().subscribe(confirmed => {
      if(confirmed){
        this.isBusy = true;
        this.ratingService.deleteRating(this.data.rating.id)
          .then( () => this.dialogRef.close('delete') )
          .finally(() => this.isBusy = false);
      }

    });
  }

  clickEdit() {
    this.edit = !this.edit;
  }
}
