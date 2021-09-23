import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordbuttonComponent } from './changepasswordbutton.component';

describe('ChangepasswordbuttonComponent', () => {
  let component: ChangepasswordbuttonComponent;
  let fixture: ComponentFixture<ChangepasswordbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangepasswordbuttonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
