import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewRatingDialogComponent} from "../dialogs/new-rating-dialog/new-rating-dialog.component";
import {Rating} from "../../models/rating";
import {User} from "../../models/user";
import {Product} from "../../models/product";

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
      description: "my description",
      email: "",
      isDarkTheme: false,
      language: "de",
      name: "Theophilus Junior Bestelmeyer",
      profileImage: "",
      registerDate: new Date(),
      username: "",
      usertype: "privat",
      verified: false
    }

    let sampleProduct: Product = {
      id: "", name: "SampleProduct", type: "Drink", brand: "Coco Cala"
    }

    let sampleRating: Rating = {
      id: "",
      product: sampleProduct,
      stars: 3.5,
      timestamp: "",
      user: sampleUser,
      votes: 0,
      description: 'test description'
    };


    const frontDialog = this.dialog.open(NewRatingDialogComponent, {
      width: '80%',
      height: '30%',
      data: sampleRating,
      autoFocus: false
    });

  }

}
