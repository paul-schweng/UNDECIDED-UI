import { Component, OnInit } from '@angular/core';
import {Rating} from "../../../models/rating";
import {User} from "../../../models/user";
import {SampleRating, SampleUser} from "../../../services/SampleData";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {SearchResults} from "../../../models/search-results";

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  results: any = []

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly searchService: SearchService) { }

  ngOnInit(): void {
    this.results = [SampleUser, SampleRating];


    this.activatedRoute.params.subscribe(params => {
      if(!params?.query)
        return;

      this.searchService.getSearchResults(params.query).then(results => {
        this.results = results;
      })
    })

  }


  getImage(rating: Rating) {

    let image = '/api/img/rating/'+rating.id+'/0';
    let defaultImage = '/assets/img/defaultImage.webp';

    return rating.imageNum ? image : defaultImage;

  }

}
