import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondopinionfacilityPage } from './secondopinionfacility.page';

describe('SecondopinionfacilityPage', () => {
  let component: SecondopinionfacilityPage;
  let fixture: ComponentFixture<SecondopinionfacilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondopinionfacilityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondopinionfacilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
