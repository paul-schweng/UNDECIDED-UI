import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewRatingDialogComponent} from "../dialogs/new-rating-dialog/new-rating-dialog.component";
import {Rating} from "../../models/rating";
import {User} from "../../models/user";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  openNewRatingDialog() {

    let sampleUser: User = {
      birthdate: new Date(),
      description: "",
      email: "",
      isDarkTheme: false,
      language: "",
      name: "Theophilus Junior Bestelmeyer",
      profileImage: "",
      registerDate: new Date(),
      username: "",
      usertype: "privat",
      verified: false

    }

    let sampleRating: Rating = {
      id: "",
      product: {},
      stars: 3.5,
      timestamp: "",
      user: sampleUser,
      votes: 0
    };

    const backDialog = this.dialog.open(NewRatingDialogComponent, {
      width: '40%',
      height: '50%',
      data: {bg: true, rating: sampleRating}
    });

    const frontDialog = this.dialog.open(NewRatingDialogComponent, {
      width: '80%',
      height: '30%',
      data: {bg: false, rating: sampleRating},
      hasBackdrop: false
    });

    //TODO: decide which one to use
    backDialog.afterClosed().subscribe(() => frontDialog.close());

    // backDialog.beforeClosed().subscribe(() => frontDialog.close());


  }

}
