import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRatingComponent } from './open-rating.component';

describe('OpenRatingComponent', () => {
  let component: OpenRatingComponent;
  let fixture: ComponentFixture<OpenRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
