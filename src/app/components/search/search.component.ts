import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RatingService} from "../../services/rating.service";
import {RatingDialogComponent} from "../dialogs/rating-dialog/rating-dialog.component";
import {Rating} from "../../models/rating";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../models/user";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchControl: FormControl = new FormControl();


  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly dialog: MatDialog) { }



  ngOnInit(): void {
    console.log(this.router.url.split('/'));

    if(this.router.url.split('/')[2] == 'results') {
      const childRouteParams = this.route.firstChild?.snapshot.paramMap;
      let query = childRouteParams?.get('query') || '';
      this.searchControl.setValue( query, {emitEvent: false});
    }


    this.searchControl.valueChanges.subscribe(val => {
      this.router.navigateByUrl(`/search/results/${val}`);
    });

  }



  startSearch() {

  }

}
