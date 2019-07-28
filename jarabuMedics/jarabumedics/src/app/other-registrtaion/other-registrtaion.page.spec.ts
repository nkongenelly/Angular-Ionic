import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherRegistrtaionPage } from './other-registrtaion.page';

describe('OtherRegistrtaionPage', () => {
  let component: OtherRegistrtaionPage;
  let fixture: ComponentFixture<OtherRegistrtaionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherRegistrtaionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherRegistrtaionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
