import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferingPage } from './add-offering.page';

describe('AddOfferingPage', () => {
  let component: AddOfferingPage;
  let fixture: ComponentFixture<AddOfferingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOfferingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
