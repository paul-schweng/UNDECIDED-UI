import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleteComponent } from './chips-autocomplete.component';
import {
  TranslateCompiler,
  TranslateLoader, TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore
} from "@ngx-translate/core";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

describe('ChipsAutocompleteComponent', () => {
  let component: ChipsAutocompleteComponent;
  let fixture: ComponentFixture<ChipsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleteComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatAutocompleteModule
      ],
      providers: [ TranslateService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
