import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog/catalog.service';

type catalog = {
  id: string;
  url: string;
};

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  showSharePdf:boolean=false
  category='INBT'
  showPdf: boolean = false;
  pdfUrl: any;
  inbt: catalog = {
    id: '',
    url: '',
  };
  solar: catalog = {
    id: '',
    url: '',
  };
  catalogMainPdfs = [];
  catalog_menu: any;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getParentCategory().subscribe((res) => {
      if (res && res.Status === '200') {
        this.setParentIds(res);
        const parentId = res.parent_category[0].Id;
        this.getCatalogProducts(parentId);
      } else {
        console.log(res.Message);
      }
    });
  }

  getCatalogProducts(parentId: string) {
    this.catalogService.getMenuFooterUpper(parentId).subscribe((response) => {
      if (response && response.Status === '200') {
        this.catalog_menu = response && response.product_category;
      } else {
        console.log(response.Message);
      }
    });
  }

  setParentIds(input: any) {
    const parentIds = input.parent_category;
    parentIds.map((val: any) => {
      if (val.Parentcategoryname === 'INBT Catalog') {
        this.inbt.id = val.Id;
      }
      if (val.Parentcategoryname === 'SOLAR Catalog') {
        this.solar.id = val.Id;
      }
    });
    this.getCatalogPdfs();
  }

  getCatalogPdfs() {
    this.catalogService.getCatalogMainPDF().subscribe((response) => {
      if (response && response.Status === '200') {
        this.catalogMainPdfs = response.Catalog_MainPdf;
        const inbtObj: any = this.catalogMainPdfs.find(
          (res: any) => res.Id === this.inbt.id
        );
        this.inbt.url = inbtObj.PdfURL;
      } else {
        console.log(response.Message);
      }
    });
  }

  onCategoryClick(id: string,cat:string) {
    this.category=cat
    this.getCatalogProducts(id);
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
