import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-maps-dialog',
  templateUrl: './maps-dialog.component.html',
  styleUrls: ['./maps-dialog.component.scss']
})
export class MapsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MapsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
  }

}
