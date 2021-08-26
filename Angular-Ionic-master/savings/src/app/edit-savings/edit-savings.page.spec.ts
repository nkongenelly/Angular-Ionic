import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSavingsPage } from './edit-savings.page';

describe('EditSavingsPage', () => {
  let component: EditSavingsPage;
  let fixture: ComponentFixture<EditSavingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSavingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSavingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
