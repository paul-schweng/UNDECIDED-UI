import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyDivComponent } from './busy-div.component';

describe('BusyDivComponent', () => {
  let component: BusyDivComponent;
  let fixture: ComponentFixture<BusyDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusyDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
