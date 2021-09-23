import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNavigatorComponent } from './job-navigator.component';

describe('JobNavigatorComponent', () => {
  let component: JobNavigatorComponent;
  let fixture: ComponentFixture<JobNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobNavigatorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
