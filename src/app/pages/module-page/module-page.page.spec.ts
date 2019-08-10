import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePagePage } from './module-page.page';

describe('ModulePagePage', () => {
  let component: ModulePagePage;
  let fixture: ComponentFixture<ModulePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
