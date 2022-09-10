import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogSharedService } from 'src/app/core/services/catalog-shared.service';
import { CatalogService } from 'src/app/core/services/catalog/catalog.service';

@Component({
  selector: 'app-catalog-sub-products',
  templateUrl: './catalog-sub-products.component.html',
  styleUrls: ['./catalog-sub-products.component.css']
})

export class CatalogSubProductsComponent implements OnInit {
  

  showSharePdf:boolean=false
  showPdf: boolean = false;
  pdfUrl: any;
  products:any;
  isDataEmpty = false;
  constructor(private router: Router, private route: ActivatedRoute, private catalogSharedService: CatalogSharedService,private catalogService:CatalogService) { }

  ngOnInit(): void {
    console.log('service data', this.catalogSharedService.getData());
    
    this.products = this.catalogSharedService.getData();
    if(!this.products){
      this.route.queryParams.subscribe((params:any)=>{
        console.log('route param id', params);
        const {id,key} = params;
        this.getProducts(id, key);
      })
    }
  }

  goBack(){
    this.router.navigate(['dashboard/catalog']);
  }

  getProducts(id:string, key:string){
    this.isDataEmpty = false;
    if(id){
      this.catalogService.getMenuCatalogProducts(id).subscribe((products:any)=>{
        if (products && products.Status === '200') {
         this.products = products.product_catalog;
        } else {
          console.log(products.Message);
        }
      })
    }else if(key){
      this.catalogService.searchProducts(key).subscribe((products:any)=>{
        if (products && products.Status === '200') {
          this.products = products.product_search;
         } else {
           console.log(products.Message);
           this.isDataEmpty = true;
         }
      })
    }else {
      alert('No Data Found');
    }
    
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
