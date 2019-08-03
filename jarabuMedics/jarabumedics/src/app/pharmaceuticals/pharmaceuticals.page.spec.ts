import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaceuticalsPage } from './pharmaceuticals.page';

describe('PharmaceuticalsPage', () => {
  let component: PharmaceuticalsPage;
  let fixture: ComponentFixture<PharmaceuticalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaceuticalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaceuticalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
