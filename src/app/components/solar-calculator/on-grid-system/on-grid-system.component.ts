import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { SolarService } from 'src/app/core/services/solar/solar.service';

@Component({
  selector: 'app-on-grid-system',
  templateUrl: './on-grid-system.component.html',
  styleUrls: ['./on-grid-system.component.css'],
})
export class OnGridSystemComponent implements OnInit {
  progress1 = 40;
  progress2 = 90;
  customerDetailShow = false;
  showSharePdf:boolean=false;
  pdfUrl: string;
  user = {
    name: '',
    phoneNo: '',
    emailId: '',
    address: '',
  };
  constructor(private router: Router, private solarService: SolarService) {}
  data: any;
  ngOnInit(): void {
    const onGridData = this.solarService.getOnGridData();
    this.data = onGridData && onGridData[0];
    console.log('on grid system data', this.data);
  }

  customerDetailsOpen() {
    this.customerDetailShow = true;
  }

  customerDetailsHide() {
    this.customerDetailShow = false;
  }

  saveResult(){
    var node: any = document.getElementById('onGridContainer');
    console.log('donwload img called', node);
    htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      const link = document.createElement('a');
      link.download = 'solar_onGrid.png';
      link.href = dataUrl;
      link.click();
      //link.delete;
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

  }

  saveUserInfo(){
    console.log('save user info called', this.user);
  }

  skipUserInfo(){
    let self = this;
    var node: any = document.getElementById('onGridContainer');
    console.log('donwload img called', node);
    htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      //self.pdfUrl = img;
      self.customerDetailShow = false;
      self.sharePdf();
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }

  sharePdf(){
    this.showSharePdf=!this.showSharePdf
  }


  knowMore() {
    this.router.navigate(['dashboard/solar-calculator/solar-features']);
  }

  goBack() {
    this.router.navigate(['dashboard/solar-calculator/on-grid']);
  }
}
