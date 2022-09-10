import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSubProductsComponent } from './catalog-sub-products.component';

describe('CatalogSubProductsComponent', () => {
  let component: CatalogSubProductsComponent;
  let fixture: ComponentFixture<CatalogSubProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogSubProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogSubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
