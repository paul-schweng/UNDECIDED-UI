import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPwdComponent } from './input-pwd.component';

describe('InputPwdComponent', () => {
  let component: InputPwdComponent;
  let fixture: ComponentFixture<InputPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
