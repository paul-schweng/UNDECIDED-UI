import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  tags: string[] = [];
  alltags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  //bei tagsInput das "!" richtig?
  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredtags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tags: string | null) => (tags ? this._filter(tags) : this.alltags.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tags
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(tags: string): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tags => tags.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
  }

}
