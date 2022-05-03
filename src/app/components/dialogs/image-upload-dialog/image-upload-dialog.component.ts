import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {WebcamDialogComponent} from "../webcam-dialog/webcam-dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-image-upload-dialog',
  templateUrl: './image-upload-dialog.component.html',
  styleUrls: ['./image-upload-dialog.component.scss']
})
export class ImageUploadDialogComponent implements OnInit {

  showDelete: boolean = false;

  constructor(public dialogRef: MatDialogRef<ImageUploadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private readonly userService: UserService) {

  }

  ngOnInit(): void {
    if(this.data.showDelete)
      this.showDelete = true;
  }

  openWebcam() {
    const webcamDialog = this.dialog.open(WebcamDialogComponent, {
      autoFocus: false
    });

    webcamDialog.beforeClosed().subscribe(value => {
      this.dialogRef.close(value);
    })
  }

  deleteImage() {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {content: 'dialog.delete.image'}
    });
    confirmDialog.beforeClosed().subscribe(confirmed => {
      if(confirmed)
        this.userService.deleteProfileImage().then(
          () => {this.dialogRef.close();},
          () => {console.log('something went wrong')}
        );
    });
  }
}
