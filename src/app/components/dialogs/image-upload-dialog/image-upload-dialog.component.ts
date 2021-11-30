import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WebcamDialogComponent} from "../webcam-dialog/webcam-dialog.component";

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImageUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openWebcam() {
    const webcamDialog = this.dialog.open(WebcamDialogComponent, {
      autoFocus: false
    });
  }
}
