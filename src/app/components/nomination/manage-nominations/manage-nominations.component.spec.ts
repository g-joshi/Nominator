import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNominationsComponent } from './manage-nominations.component';

describe('ManageNominationsComponent', () => {
  let component: ManageNominationsComponent;
  let fixture: ComponentFixture<ManageNominationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
