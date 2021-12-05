import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Rating} from "../../../models/rating";
import {FormControl} from "@angular/forms";

import {GeoLocation} from "../../../models/location";
import {Label, LABELS} from "../../../models/label";
import {MatSelectionListChange} from "@angular/material/list";
import {AutocompleteService} from "../../../services/autocomplete.service";
import {MatDialog} from "@angular/material/dialog";
import {MapsDialogComponent} from "../../dialogs/maps-dialog/maps-dialog.component";
import {NgbCarousel} from "@ng-bootstrap/ng-bootstrap";
import {ImageUploadDialogComponent} from "../../dialogs/image-upload-dialog/image-upload-dialog.component";
import {WebcamImage} from "ngx-webcam";
import {ConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {Product} from "../../../models/product";
import {NgxStarsComponent} from "ngx-stars";
import {clone} from "../../../services/clone";


@Component({
  selector: 'base-rating[rating]',
  templateUrl: './base-rating.component.html',
  styleUrls: ['./base-rating.component.scss']
})
export class BaseRatingComponent implements OnInit {

  _rating!: Rating;
  readonly MAX_IMAGES: number = 5;
  private readonly TIMEOUT_AUTOCOMPLETE: number = 800;

  @Input() set rating(rating: Rating){
    this._rating = rating;
    this.productControl.setValue(this._rating.product);
  }
  @Input() edit: boolean = false;
  @ViewChild('stars') starsInput!: NgxStarsComponent;
  @Output() valid = new EventEmitter<boolean>();


  constructor(private autocompleteService: AutocompleteService,
              public dialog: MatDialog) {

    let timeoutProduct: number;
    let timeoutBrand: number;

    /*
    On new user input:
    the autocomplete service is called after TIMEOUT_AUTOCOMPLETE milliseconds.
    A new timeout (service call) is ONLY created IF the old timeout is finished!

    In other words: If the user keeps typing the backend is called every TIMEOUT_AUTOCOMPLETE ms.
    */
    this.productControl.valueChanges.subscribe(input => {
      if(typeof input != 'string')
        return;

      input = input.trim();
      if (!timeoutProduct && input)
        timeoutProduct = setTimeout(() => {
            this.autocompleteService.getProduct(input.toLowerCase())
              .then(products => this.filteredOptionsProduct = products);
          timeoutProduct = 0;
        }, this.TIMEOUT_AUTOCOMPLETE);
    });

    this.brandControl.valueChanges.subscribe(input => {
      input = input.trim();
      if (!timeoutBrand && input)
        timeoutBrand = setTimeout(() => {
            this.autocompleteService.getBrand(input.toLowerCase())
              .then(tags => this.filteredOptionsBrand = tags);
          timeoutBrand = 0;
        }, this.TIMEOUT_AUTOCOMPLETE);
    });

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
  filteredOptionsProduct: Product[] = [];
  filteredOptionsBrand: string[] = [];
  filteredOptionsLocation: Location[] = [];
  LABELS: Label[] = LABELS.slice();

  ngOnInit() {
    this.valid.emit(this.productControl.value.name);
    if (!this._rating.location) this._rating.location = {} as GeoLocation;

    this.productControl.valueChanges.subscribe(change => {
      this.valid.emit(this.productControl.valid);
      if(typeof change == 'string')
        this._rating.product.name = change;
      else {
        this._rating.product = clone(change);

        this._rating.labelList = this._rating.product.labelList;
        this._rating.types = this._rating.product.types;
        this.brandControl.setValue(this._rating.product.brand);

        this._rating.stars = this._rating.product.avgStars!;
        this.starsInput.setRating(this._rating.product.avgStars!);

      }

    });
    //this.brandControl.valueChanges.subscribe(change => this._rating.product.brand = change);

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

  displayFnProduct = (product: Product) => {
    return product ? product.name : (this._rating.product.name ?? '');
  };

  displayFnBrand = (brand: string) => {
    return brand ? brand : (this._rating.product.brand ?? '');
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

  onFileChanged(event: any, carousel: NgbCarousel) {
    console.log(event)
    if(!this._rating.images)
      this._rating.images = [];

    let url: any;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => { // called once readAsDataURL is completed
      url = _event.target?.result;
      this._rating.images?.push({file: event.target.files[0], base64: url});

      new Promise( resolve => setTimeout(resolve, 300) )
        .then(()=>carousel.prev()
        );
    }

  }

  getImage(image: any): string{
    return typeof image == 'string' ? image : image.base64;
  }

  openMap() {
    const mapDialog = this.dialog.open(MapsDialogComponent, {
      autoFocus: false
    });
  }

  uploadImage(fileInput: HTMLInputElement, carousel: NgbCarousel) {
    const uploadDialog = this.dialog.open(ImageUploadDialogComponent, {
      autoFocus: false,
      data: {fileInput: fileInput}
    });

    uploadDialog.afterClosed().subscribe((value: WebcamImage) => {
      if(value?.imageAsDataUrl){
        this._rating.images?.push({base64: value.imageAsDataUrl});
        new Promise( resolve => setTimeout(resolve, 300) )
          .then(()=>carousel.prev()
          );
      }

    })
  }

  deleteImage(i: number) {
    const uploadDialog = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: {content: 'dialog.delete.image'}
    });

    uploadDialog.beforeClosed().subscribe(confirmed => {
      if(confirmed)
        this._rating.images?.splice(i,1);
    });
  }


}
