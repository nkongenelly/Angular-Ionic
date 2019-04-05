import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectsPage } from './add-projects.page';

describe('AddProjectsPage', () => {
  let component: AddProjectsPage;
  let fixture: ComponentFixture<AddProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
