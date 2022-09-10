import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CommonService } from '../../../core/services/common.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-pricelist-card',
  templateUrl: './pricelist-card.component.html',
  styleUrls: ['./pricelist-card.component.css'],
})
export class PricelistCardComponent implements OnInit {
  showSharePdf:boolean=false
  showPdf: boolean = false;
  pdfUrl: any;
  constructor(private userService: UserService, public storageService:StorageService) {}
  priceList: any;
  selectedUser='';
  ngOnInit(): void {
    this.selectedUser='DEALER';
    this.getPriceList('DEALER')
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

  getPriceList(userType:string){
    try {
      this.userService.getPriceListPageCards(userType).subscribe((res) => {
        if (res && res.Status === '200') {
          console.log('price list', res);
          this.priceList = res && res.Price_data;
        } else {
          console.log(res.Message);
        }
      });
    } catch (e) {
      console.log('Exception occured pricelist card', e);
    }
  }

  onTabChange(userType:string){
    this.selectedUser=userType;
    this.getPriceList(userType);
  }
}

