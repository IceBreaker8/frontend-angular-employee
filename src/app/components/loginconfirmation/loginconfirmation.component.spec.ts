import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginconfirmationComponent } from './loginconfirmation.component';

describe('LoginconfirmationComponent', () => {
  let component: LoginconfirmationComponent;
  let fixture: ComponentFixture<LoginconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginconfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
