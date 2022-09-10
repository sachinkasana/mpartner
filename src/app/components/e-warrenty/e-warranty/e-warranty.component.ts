import { AfterViewInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { EPointsService } from 'src/app/core/services/epoints/e-points.service';
import Utils from 'src/app/core/utils/helper.util';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

const addDays = (date: any, days: any) => {
  date.setDate(date.getDate() - days);
  return date;
};

@Component({
  selector: 'app-e-warranty',
  templateUrl: './e-warranty.component.html',
  styleUrls: ['./e-warranty.component.css'],
})
export class EWarrantyComponent implements OnInit {
  @ViewChild('progress') progress: ElementRef;

  indiaProgress = 0;
  myProgress = 0;
  isPanValid: boolean = false;
  progressBarData: any;
  bannerData: any;
  pointsData: any;
  tAndC: any;
  showScanWarrantyPopup = false;
  saleDateInput: any;
  saleDate: any;
  maxSaleDate:any;
  mobile: any;
  allocatedPoints: any;
  minDate1 = new Date();
  formValid=false;
  reportCardData = [
    {
      Product: '0',
      Accepted: '0',
      Rejected: '0',
      Total_Card: '0',
      Total_Point: '0',
      Negative_Points: '0',
      Final_Points: '0',
    }
  ];
  constructor(
    private router: Router,
    private ewarranty: EWarrantyService,
    public storageService: StorageService,
    private epoints: EPointsService,
    private toaster: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.minDate1 = addDays(this.minDate1, 6);
    this.storageService.removeItem('saleDateMobile');
    this.maxSaleDate = new Date();
    this.saleDateInput = new Date();
    console.log('minDate1', this.minDate1);
    forkJoin([
      this.ewarranty.getAcceptanceRejectionPercentage(),
      //this.epoints.getPartnerPoints(),
      this.ewarranty.getReports(),
      this.ewarranty.getPageCards(),
      this.epoints.getPineLabPoints(),
      this.ewarranty.getTermsAndConditions(),
      this.epoints.getAllocatedPoints(),
      this.userService.getUserProfile(),
    ]).subscribe(
      ([
        rejectionData,
        //partnerPoints,
        reports,
        pageCards,
        pinelabPoints,
        termsAndConditions,
        allocatedEPoints,
        userProfile
      ]) => {
        console.log(
          'fork join data',
          rejectionData,
          //partnerPoints,
          reports,
          pageCards,
          pinelabPoints,
          termsAndConditions,
          allocatedEPoints,
          userProfile
        );
        // this.progressBarData = rejectionData[0];
        this.reportCardData = reports.length >0 ? reports: this.reportCardData;
        this.indiaProgress = parseInt(rejectionData[0].Total);
        this.myProgress = parseInt(rejectionData[0].My);
        this.bannerData = pageCards.ewarranty_data[0].Bannercard_data;
        this.pointsData = pinelabPoints;
        this.tAndC =
          termsAndConditions.terms_condition_Data[0].terms_condition_data;
        this.allocatedPoints = allocatedEPoints.Data[0];
        this.myProgress;
        this.isPanValid = userProfile && userProfile.Pan_val.length
        this.storageService.setItem('PaytmAmt', this.allocatedPoints.PaytmAmt);
        this.storageService.setItem(
          'brandVoucherAmt',
          this.allocatedPoints.brandVoucherAmt
        );
      }
    );
  }

  formatTitle = (percent: number) => {
    return ['', percent + '%'];
  };

  setHeight = () => {
    return 40;
  };

  scanQR() {
    this.storageService.removeItem('serialNumbers');
    this.ewarranty.getSaleDate().subscribe((data: any) => {
      console.log('sale date data', data);
      this.minDate1 = addDays(this.minDate1, data.Saledate);
      //this.storageService.setItem("Saledate", data.Saledate);
      this.saleDate = data.Saledate;
      this.showScanWarrantyPopup = true;
    });
  }
  closeScannerPopup(){
    this.showScanWarrantyPopup = false;
  }
  submitSaleDate() {
    const dateSendingToServer = new DatePipe('en-US').transform(
      this.saleDateInput,
      'dd/MM/yyyy'
    );
    if(this.mobile !==  undefined && (this.mobile.toString().length==10 && this.saleDate)){
      this.formValid=false;
      this.storageService.setItem('Saledate', dateSendingToServer);
    
    this.storageService.setItem('saleDateMobile',this.mobile);
    const obj = {
      mobile_number: this.mobile.toString(),
      sale_date: this.saleDate,
      user_id: this.storageService.getItem('userId'),
      token: this.storageService.getItem('token'),
    };
    this.ewarranty.validatePartnerStatus(obj).subscribe((data: any) => {
      console.log('validate partner status', data);
      if (data && data.Status == '200') {
        this.router.navigate(['dashboard/e-warranty/scanned-qr-code']);
      } else {
        console.log('Validate Partner Status API Error', data.Message);
      }
    });
    } else{
      this.formValid=true;
    }
    
    
  }

  redeemPoints() {
    if(!(this.allocatedPoints.paytm_status === 'PENDING' )){
      if (this.isPanValid) {
        this.router.navigate(['dashboard/e-warranty/redeem-points']);
      } else {
        alert('Redemption NOT allowed as your PAN details are NOT verified')
      }
    }
    
  }

  dealerOptions() {
    this.router.navigate(['dashboard/e-warranty/dealer-options']);
  }

  downloadReport() {
    console.log('download report called');
    this.ewarranty.getReportCard().subscribe((data: any) => {
      if (data && data.length) {
        const keys = Object.keys(data[0]);
        Utils.downloadFile(data, keys, 'disty-reportcard');
      } else {
        this.toaster.error('No Data Found');
      }
    });
  }
  getTripDetails() {
    console.log(this.pointsData.trip_pdf);
  }
}
