import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreatePage } from './table-create.page';

describe('TableCreatePage', () => {
  let component: TableCreatePage;
  let fixture: ComponentFixture<TableCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
