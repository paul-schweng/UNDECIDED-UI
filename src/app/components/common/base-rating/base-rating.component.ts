import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "../../../models/rating";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";


//TODO: remove this
export interface User {
  name: string;
}

@Component({
  selector: 'base-rating[rating]',
  templateUrl: './base-rating.component.html',
  styleUrls: ['./base-rating.component.scss']
})
export class BaseRatingComponent implements OnInit {


  @Input() rating!: Rating;
  @Input() edit: boolean = false;
  isBusy: boolean = true;

  constructor() {
  }

  productControl = new FormControl();
  brandControl = new FormControl();
  productOptions: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor2'}];
  brandOptions: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptionsProduct!: Observable<User[]>;
  filteredOptionsBrand!: Observable<User[]>;

  ngOnInit() {
    this.rating.product.location = {name: ''};


    this.productControl.valueChanges.subscribe(change => this.rating.product.name = change);
    this.brandControl.valueChanges.subscribe(change => this.rating.product.brand = change);

    this.filteredOptionsProduct = this.productControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterProduct(name) : this.productOptions.slice())),
    );

    this.filteredOptionsBrand = this.brandControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterBrand(name) : this.brandOptions.slice())),
    );

  }

  displayFnProduct = (user: User) => {
    return user && user.name ? user.name : (this.rating.product.name || '');
  };

  displayFnBrand = (user: User) => {
    return user && user.name ? user.name : (this.rating.product.brand || '');
  }

  private _filterProduct(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.productOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterBrand(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.brandOptions.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  postClicked(): void {
    console.log(this.rating);
  }

  setStars(stars: number): void {
    this.rating.stars = stars;
  }

}
