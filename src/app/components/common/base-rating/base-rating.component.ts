import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "../../../models/rating";
import {FormControl} from "@angular/forms";

import {GeoLocation} from "../../../models/location";
import {Label, LABELS} from "../../../models/label";
import {MatSelectionListChange} from "@angular/material/list";
import {AutocompleteService} from "../../../services/autocomplete.service";


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

  constructor(private autocompleteService: AutocompleteService) {
    this.productControl.valueChanges.subscribe(input =>
      autocompleteService.getProduct(input.toLowerCase())
        .then(tags => this.filteredOptionsProduct = tags)
    );
    this.brandControl.valueChanges.subscribe(input =>
      autocompleteService.getBrand(input.toLowerCase())
        .then(tags => this.filteredOptionsBrand = tags)
    );
    /*
    this.locationControl.valueChanges.subscribe(input =>
      autocompleteService.getTags(input.toLowerCase())
        .then(tags => this.filteredOptionsLocation = tags)
    );
     */
  }


  productControl = new FormControl();
  brandControl = new FormControl();
  locationControl = new FormControl();
  productOptions: string[] = ['Fanta', 'Sprite'];
  brandOptions: string[] = ['Nike', 'Samsung'];
  filteredOptionsProduct: string[] = [];
  filteredOptionsBrand: string[] = [];
  filteredOptionsLocation: string[] = [];
  LABELS: Label[] = LABELS.slice();

  ngOnInit() {

    if (!this._rating.product.location) this._rating.product.location = {} as GeoLocation;

    this.productControl.valueChanges.subscribe(change => this._rating.product.name = change);
    this.brandControl.valueChanges.subscribe(change => this._rating.product.brand = change);

    /*
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

     */

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

  onFileChanged(event: any) {
    console.log(event)
    if(!this._rating.images)
      this._rating.images = [];

    let url: any;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => { // called once readAsDataURL is completed
      url = _event.target?.result;
      this._rating.images?.push({file: event.target.files[0], url: url});
    }

  }

  getImage(image: any): string{
    return typeof image == 'string' ? image : image.url;
  }
}
