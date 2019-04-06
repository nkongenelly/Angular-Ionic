import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingPage } from './offering.page';

describe('OfferingPage', () => {
  let component: OfferingPage;
  let fixture: ComponentFixture<OfferingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
