import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren
} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Label, LABELS} from "../../models/label";


type LabelType = Label & {state?: boolean};
type Filter = {id: string, label: string, state?: boolean, enablePopover?: boolean, popoverContent?: TemplateRef<any>};


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {


  searchControl: FormControl = new FormControl();

  lastUrlOpen?: ActivatedRouteSnapshot;
  query: string = '';

  @ViewChildren('popoverContent', { read: TemplateRef }) popoverContents = new QueryList<TemplateRef<any>>();

  // popoverContent = {};

  // type: {label: string, state?: boolean, enablePopover?: boolean, popoverContent?: TemplateRef<any>}
  filters: Filter[] = [
    {id: 'rating', label: 'basics.ratings'},
    {id: 'user', label: 'search.profile'},
    {id: 'location', label: 'search.location'},
    {id: 'brand', label: 'search.brand'},
    {id: 'labels', label: 'search.tags', enablePopover: true},
  ]


  labels: LabelType[] = LABELS.slice();



  constructor(private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly searchService: SearchService) { }


  ngAfterViewInit() {
    this.filters.forEach(filter => {
      if(filter.enablePopover)
        filter.popoverContent = this.popoverContents.toArray().find(content => content.elementRef.nativeElement.attributes.data == filter.id);
    })

    // console.log(this.popoverContents.first.elementRef.nativeElement.attributes.data);
  }


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


  filterChanged() {
    let filters: any[] = this.filters
      .filter(f => f.state == true && !f.enablePopover)
      .map(f => this.getFilterValue(f.label));

    let labels = this.labels
      .filter(l => l.state == true)
      .map(l => l.id);

    filters.push( {labels: labels} );
    //filters.push( {sheesh: labels} );

    this.searchService.filters = filters;

  }

  getFilterValue(filterString: string): string {
    return filterString.split(".").slice(-1)[0];
  }


  tagChanged(label: LabelType) {
    label.state = !label.state;

    if(this.labels.some(l => l.state)){
      this.filters.find(f => f.id == 'rating')!.state = true;
      this.filters.find(f => f.id == 'labels')!.state = true;
    }
    else
      this.filters.find(f => f.id == 'labels')!.state = false;

    this.filterChanged()
  }


  chipClicked(filter: Filter) {
    if(filter.id == 'rating' && this.labels.some(l => l.state))
      return;
    if(filter.id == 'labels')
      return;

    filter.state = !filter.state && !filter.enablePopover
  }


}
