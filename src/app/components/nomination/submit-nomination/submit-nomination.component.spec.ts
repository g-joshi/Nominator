import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNominationComponent } from './submit-nomination.component';

describe('SubmitNominationComponent', () => {
  let component: SubmitNominationComponent;
  let fixture: ComponentFixture<SubmitNominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitNominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
