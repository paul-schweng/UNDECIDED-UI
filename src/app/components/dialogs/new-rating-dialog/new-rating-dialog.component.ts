import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Rating} from "../../../models/rating";

@Component({
  selector: 'app-new-rating-dialog',
  templateUrl: './new-rating-dialog.component.html',
  styleUrls: ['./new-rating-dialog.component.scss']
})
export class NewRatingDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<NewRatingDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {bg: boolean, rating: Rating}) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
