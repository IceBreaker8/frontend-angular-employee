import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordbuttonComponent } from './forgotpasswordbutton.component';

describe('ForgotpasswordbuttonComponent', () => {
  let component: ForgotpasswordbuttonComponent;
  let fixture: ComponentFixture<ForgotpasswordbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
