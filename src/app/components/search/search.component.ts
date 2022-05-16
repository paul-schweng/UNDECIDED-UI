import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  searchControl: FormControl = new FormControl();
  lastUrlOpen?: ActivatedRouteSnapshot;
  query: string = '';


  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute) { }



  ngOnInit(): void {
    // console.log(this.route.firstChild?.snapshot.url);

    if(this.route.firstChild?.snapshot.url[0].path == 'results') {
      const childRouteParams = this.route.snapshot.queryParams;
      let query = childRouteParams?.q || '';
      // console.log(childRouteParams)

      this.query = query;
      this.searchControl.setValue( query, {emitEvent: false});
    }


    this.searchControl.valueChanges.subscribe(val => {
      if(this.query === val.trim())
        return;

      this.query = val.trim();
      this.router.navigate([`/search/results`], {queryParams: {q: this.query}});
    });

    this.router.events.subscribe(() => {
      let snapshot = this.route.snapshot;
      // console.log(snapshot)

      if(snapshot == this.lastUrlOpen)
        return;

      if(this.route.snapshot.url[0].path == 'search' && this.route.firstChild?.snapshot.url != null){
        let childRoute = this.route.firstChild.snapshot.url;
        this.lastUrlOpen = snapshot;

        this.lastUrlOpen.url.push(...childRoute);
      }

      // console.log(this.lastUrlOpen)
      // console.log(this.router.url)
    });

    this.router.events.subscribe(event => {
      // console.log((event as NavigationEnd).url);

      if (event instanceof NavigationEnd && event.url == '/search' && this.lastUrlOpen && this.lastUrlOpen?.url.length > 1) {
        // console.log(this.lastUrlOpen)
        // console.log(this.lastUrlOpen!.url.map(url => url.path))
        this.router.navigate(this.lastUrlOpen.url.map(url => url.path), {queryParams: this.lastUrlOpen.queryParams})
      }
    });

  }



  startSearch() {

  }

}
