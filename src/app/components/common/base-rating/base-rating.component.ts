import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "../../../models/rating";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GeoLocation} from "../../../models/location";


@Component({
  selector: 'base-rating[rating]',
  templateUrl: './base-rating.component.html',
  styleUrls: ['./base-rating.component.scss']
})
export class BaseRatingComponent implements OnInit {


  _rating!: Rating;

  @Input() set rating(rating: Rating){
    this._rating = rating;
  }
  @Input() edit: boolean = false;

  constructor() {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  productControl = new FormControl();
  brandControl = new FormControl();
  productOptions: string[] = ['Fanta', 'Sprite'];
  brandOptions: string[] = ['Nike', 'Samsung'];
  filteredOptionsProduct!: Observable<string[]>;
  filteredOptionsBrand!: Observable<string[]>;

  ngOnInit() {
    if (!this._rating.product.location) this._rating.product.location = {} as GeoLocation;

    this.productControl.valueChanges.subscribe(change => this._rating.product.name = change);
    this.brandControl.valueChanges.subscribe(change => this._rating.product.brand = change);

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

  displayFnProduct = (product: string) => {
    return product ? product : (this._rating.product.name || '');
  };

  displayFnBrand = (brand: string) => {
    return brand ? brand : (this._rating.product.brand || '');
  }

  private _filterProduct(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.productOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterBrand(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.brandOptions.filter(option => option.toLowerCase().includes(filterValue));
  }



  setStars(stars: number): void {
    this._rating.stars = stars;
  }

}
