import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {AutocompleteService} from "../../../services/autocomplete.service";

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
  filteredTags: string[] = [];
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly autocompleteService: AutocompleteService) {
    this.tagsCtrl.valueChanges.subscribe( input =>
      autocompleteService.getTags(input.toLowerCase())
        .then(tags => {
          let lowerCaseTags = tags.slice().map(tag => tag.toLowerCase());

          this.tags.forEach(tag => {
            let i = lowerCaseTags.indexOf(tag.toLowerCase());

            if (i !== -1) tags.splice(i,1);
          })
          this.filteredTags = tags;
        },
          //TODO:Delete This
          ()=>{
          let lowerCaseTags = this.allTags.slice().map(tag => tag.toLowerCase());

          this.tags.forEach(tag => {
            let i = lowerCaseTags.indexOf(tag.toLowerCase());

            if (i !== -1) this.allTags.splice(i,1);
          })
          this.filteredTags = this.allTags;
        })
    );
  }



  add(input: string, event?: MatChipInputEvent): void {
    const value = (input || '').trim();

    let lowerCaseTags = this.tags.slice().map(tag => tag.toLowerCase());

    // Add our tags
    if (value && !lowerCaseTags.includes(value.toLowerCase()) && this.tags.length<5) {
      this.tags.push(value);
      this.tags.forEach(tag => {
        let i = this.allTags.indexOf(tag);

        if (i !== -1) this.allTags.splice(i,1);
      })
    }

    // Clear the input value
    if (event)
      event.chipInput!.clear();
    else
      this.tagsInput.nativeElement.value = '';

    this.tagsCtrl.setValue(null);
  }

  remove(tags: string): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  ngOnInit(): void {
  }

}
