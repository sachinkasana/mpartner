import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogSharedService } from 'src/app/core/services/catalog-shared.service';
import { CatalogService } from '../../../core/services/catalog/catalog.service';
@Component({
  selector: 'app-catalog-products',
  templateUrl: './catalog-products.component.html',
  styleUrls: ['./catalog-products.component.css'],
})
export class CatalogProductsComponent implements OnInit {
  showSharePdf:boolean=false
  showPdf: boolean = false;
  pdfUrl: any;

  @Input()
  catalogProducts: any;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private catalogSharedService: CatalogSharedService
  ) {}

  ngOnInit(): void {
    console.log('sub products input', this.catalogProducts);
  }

  selectProduct(item: any): void {
    console.log('selected product', item);
    const { Id } = item;
    //const Id = '30';
    this.catalogService
      .getMenuCatalogProducts(Id)
      .subscribe((products: any) => {
        if (products && products.Status === '200') {
          this.catalogSharedService.setData(products.product_catalog);
          this.router.navigate(['dashboard/catalog/detail'],{ queryParams: { id: Id }});
        } else {
          console.log(products.Message);
        }
      });
  }

  openPdf(pdfData: any) {
    this.showPdf = true;
    this.pdfUrl = pdfData;
  }

  hidePdf() {
    this.showPdf = false;
  }

  sharePdf(){
    this.showSharePdf=!this.showSharePdf
  }
}
