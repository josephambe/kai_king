import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagePage } from './edit-image.page';

describe('EditImagePage', () => {
  let component: EditImagePage;
  let fixture: ComponentFixture<EditImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
