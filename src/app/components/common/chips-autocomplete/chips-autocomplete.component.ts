import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {AutocompleteService} from "../../../services/autocomplete.service";

@Component({
  selector: 'chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
})
export class ChipsAutocompleteComponent implements OnInit {

  @Input('type') set value(tags: string[] | undefined){
    this.tags = tags || [];
  }
  @Output('typeChange') tagsChange = new EventEmitter<string[]>();

  @Input('maxTags') MAX_TAGS: number = 5;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: string[] = [];
  tags: string[] = [];
  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  private readonly TIMEOUT_AUTOCOMPLETE: number = 800;

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;

  constructor(private readonly autocompleteService: AutocompleteService) {

    let timeout: number;

    /*
    On new user input:
    the autocomplete service is called after TIMEOUT_AUTOCOMPLETE milliseconds.
    A new timeout (service call) is ONLY created IF the old timeout is finished!

    In other words: If the user keeps typing the backend is called every TIMEOUT_AUTOCOMPLETE ms.
    */
    this.tagsCtrl.valueChanges.subscribe( input => {

      input = input.trim();
      if (!timeout && input)
        timeout = setTimeout(() => {
            autocompleteService.getType(input.toLowerCase())
              .then(tags => {
                  let lowerCaseTags = tags.slice().map(tag => tag.toLowerCase());

                  this.tags.forEach(tag => {
                    let i = lowerCaseTags.indexOf(tag.toLowerCase());

                    if (i !== -1) tags.splice(i, 1);
                  })
                  this.filteredTags = tags;
                }
                //TODO:Delete This
                ,() => {
                  let lowerCaseTags = this.allTags.slice().map(tag => tag.toLowerCase());

                  this.tags.forEach(tag => {
                    let i = lowerCaseTags.indexOf(tag.toLowerCase());

                    if (i !== -1) this.allTags.splice(i, 1);
                  })
                  this.filteredTags = this.allTags;
                });
            timeout = 0;
        }, this.TIMEOUT_AUTOCOMPLETE);

    });
  }



  add(input: string, event?: MatChipInputEvent): void {
    const value = (input || '').trim();

    let lowerCaseTags = this.tags.slice().map(tag => tag.toLowerCase());

    // Add our tags
    if (value && !lowerCaseTags.includes(value.toLowerCase()) && this.tags.length < this.MAX_TAGS) {
      this.tags.push(value);
      this.tagsChange.emit(this.tags);
    }

    // Clear the input value
    if (event)
      event.chipInput!.clear();
    else
      this.tagsInput.nativeElement.value = '';

    this.tagsCtrl.setValue('');
  }

  remove(tags: string): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsChange.emit(this.tags);
    }
  }

  ngOnInit(): void {
  }

}
