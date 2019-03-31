import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingsPage } from './add-savings.page';

describe('AddSavingsPage', () => {
  let component: AddSavingsPage;
  let fixture: ComponentFixture<AddSavingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSavingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
