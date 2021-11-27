import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Rating} from "../../../models/rating";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GeoLocation} from "../../../models/location";
import {Label, LABELS} from "../../../models/label";
import {MatSelectionList, MatSelectionListChange} from "@angular/material/list";


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

  @ViewChild('labels') labelsInput!: ElementRef<MatSelectionList>;

  constructor() {
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  productControl = new FormControl();
  brandControl = new FormControl();
  productOptions: string[] = ['Fanta', 'Sprite'];
  brandOptions: string[] = ['Nike', 'Samsung'];
  filteredOptionsProduct!: Observable<string[]>;
  filteredOptionsBrand!: Observable<string[]>;
  LABELS: Label[] = LABELS.slice();

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

  isLabelSelected(label: Label): boolean {
    return this._rating.labelList!.some(l => l.icon == label.icon);
  }

  changedLabel(event: MatSelectionListChange) {
    event.options.forEach(opt => {
      if (this._rating.labelList?.includes(opt.value)) {
        let i = this._rating.labelList?.indexOf(opt.value);
        this._rating.labelList?.splice(i,1);
      }else {
        this._rating.labelList?.push(opt.value);
        this._rating.labelList?.sort((label1,label2) => label1.id - label2.id);
      }
    })
  }
}
