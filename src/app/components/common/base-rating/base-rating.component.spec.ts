import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseRatingComponent } from './base-rating.component';

describe('BaseRatingComponent', () => {
  let component: BaseRatingComponent;
  let fixture: ComponentFixture<BaseRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
