import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../../../services/rating.service";
import {MatDialog} from "@angular/material/dialog";
import {Rating} from "../../../models/rating";
import {RatingDialogComponent} from "../../dialogs/rating-dialog/rating-dialog.component";

@Component({
  selector: 'app-open-rating',
  templateUrl: './open-rating.component.html',
  styleUrls: ['./open-rating.component.scss']
})
export class OpenRatingComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              ) { }

  ngOnInit(): void {


  }

}
