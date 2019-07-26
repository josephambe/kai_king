import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailPage } from './table-detail.page';

describe('TableDetailPage', () => {
  let component: TableDetailPage;
  let fixture: ComponentFixture<TableDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
