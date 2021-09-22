import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AmplifyService } from 'aws-amplify-angular';
import { LoginMenuComponent } from './login-menu.component';

describe('LoginMenuComponent', () => {
  let component: LoginMenuComponent;
  let fixture: ComponentFixture<LoginMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [AmplifyService],
      declarations: [LoginMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
