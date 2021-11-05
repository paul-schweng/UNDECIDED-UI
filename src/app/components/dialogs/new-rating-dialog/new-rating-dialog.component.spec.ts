import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRatingDialogComponent } from './new-rating-dialog.component';

describe('NewRatingDialogComponent', () => {
  let component: NewRatingDialogComponent;
  let fixture: ComponentFixture<NewRatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRatingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
