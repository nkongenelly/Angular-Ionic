import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsPage } from './hospitals.page';

describe('HospitalsPage', () => {
  let component: HospitalsPage;
  let fixture: ComponentFixture<HospitalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
