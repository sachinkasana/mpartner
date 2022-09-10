import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { EPointsService } from 'src/app/core/services/epoints/e-points.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-redeem-points',
  templateUrl: './redeem-points.component.html',
  styleUrls: ['./redeem-points.component.css'],
})
export class RedeemPointsComponent implements OnInit {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private epoints: EPointsService,
    private toaster: ToastrService
  ) { }
  userId: string;
  token: string;
  mobile: string;
  paytmPoints: string;
  tdsValue: string;
  netTransferAmt = 0;
  brandVoucherAmt: string;
  paytmMobile: any;
  paytmTransferAmt: any;
  paytmOTPInput: any;
  showPaytmTranfer = false;
  showPaytmOTPAuthPopup = false;
  showTransferConfirmationPopup = false;
  paytmConfirmationData: any;
  formValid = false;
  ngOnInit(): void {
    this.paytmMobile = '';
    this.userId = this.storageService.getItem('userId');
    this.token = this.storageService.getItem('token');
    this.mobile = this.storageService.getItem('mobile');
    this.paytmPoints = this.storageService.getItem('PaytmAmt');
    this.brandVoucherAmt = this.storageService.getItem('brandVoucherAmt');
    //this.tdsValue = this.storageService.getItem('tdsValue');
  }

  verifyPaytmMobile() {
    //this.paytmMobile = '';
    const obj = {
      mobileNumber: this.paytmMobile,
      token: this.token,
      transactionMode: 'Paytm',
      user_id: this.userId,
      transferAmount:this.paytmTransferAmt
    };
    this.epoints.verifyPaytmNumber(obj).subscribe((data: any) => {
      console.log('paytm data', data);
      if (data && data.Status == '200') {
        this.storageService.setItem('Paytm_init_id', data.Paytm_init_id);
        //this.storageService.setItem('tdsValue', data.tdsValue);
        this.tdsValue = data.tdsValue;
        this.submitPaytmTransferPoints();
      } else {
        //console.log('Verify Paytm Error', data.Message);
        this.toaster.error(data.Message)
      }
    });
  }

  redeemBrand() {
    console.log('brand redeemed', this.userId, this.token);
    this.router.navigate(['dashboard/e-warranty/pinelab']);
  }

  transferPaytmPoints() {
    //this.router.navigate(['/home',{outlets:{homeSection: ['trnsferPnts'] }}])
    //this.verifyPaytmMobile();
    this.showPaytmTranfer = true;
    this.formValid = false;
    this.paytmMobile ='';
    this.paytmTransferAmt='';
  }

  closePaytmPopup() {
    this.showPaytmTranfer = false;
  }
  closePaytmOTPPopup(){
    this.showPaytmTranfer = false;
    this.showPaytmOTPAuthPopup = false;
    this.showTransferConfirmationPopup = false;
  }

  transferPoints() {
    this.router.navigate(['dashboard/e-warranty/transfer-points']);
  }

  submitPaytmTransferPoints() {
    const txnId = this.storageService.getItem('Paytm_init_id');
    const uid = this.storageService.getItem('userId');
    const mobile = this.paytmMobile;
    this.netTransferAmt = parseInt(this.paytmTransferAmt) - parseFloat(this.tdsValue);

    this.epoints.getPaytmOTP(uid, mobile, txnId).subscribe((data: any) => {
      console.log('paytmotp resp', data);
      if (data && data.Status === 'SUCCESS') {
        this.showOTPValidatePopup();
      } else {
        console.log('Create Paytm otp api error', data.Message);
      }
    });
  }

  submitTransfer() {
    if (!this.paytmMobile || !this.paytmTransferAmt) {
      this.formValid = true;
      return;
    }
    this.formValid = false;
    if (this.paytmMobile && this.paytmTransferAmt) {
      this.verifyPaytmMobile();
    }
  }

  showOTPValidatePopup() {
    console.log('showOTPValidatePopup called');
    this.showPaytmTranfer = false;
    this.showPaytmOTPAuthPopup = true;
    console.log('this.showPaytmTranfer',this.showPaytmTranfer)
    console.log('this.showPaytmOTPAuthPopup',this.showPaytmOTPAuthPopup)
    console.log('this.showTransferConfirmationPopup',this.showTransferConfirmationPopup)
    
    // setTimeout(() => {
    //   this.showPaytmOTPAuthPopup = true;
    // }, 10);
  }

  verifyPaytmOTP() {
    if (this.paytmOTPInput) {
      console.log('otp input', this.paytmOTPInput);
      this.epoints
        .validatePaytmOTP(this.paytmOTPInput)
        .subscribe((data: any) => {
          console.log('otp verified', data);
          if (data && data.Status === 'SUCCESS') {
            this.showPaytmOTPAuthPopup = false;
            this.submitPaytmTransferData();
          } else {
            alert(data.Message);
          }
        });
    }
  }

  submitPaytmTransferData() {
    const paytm_init_id = this.storageService.getItem('Paytm_init_id');
    const uid = this.storageService.getItem('userId');
    const token = this.storageService.getItem('token');

    const obj = {
      mobileNumber: this.paytmMobile.toString(),
      AvailableAmount: this.paytmPoints.toString(),
      TransferAmount: this.paytmTransferAmt.toString(),
      payTmInitid: paytm_init_id.toString(),
      TransactionMode: 'Paytm',
      otp: this.paytmOTPInput.toString(),
      user_id: uid,
      token: token,
    };

    this.epoints.verifyPaytmMobileOTP(obj).subscribe((data: any) => {
      console.log('submit paytm transfer otp', data);
      this.paytmConfirmationData = data;
      this.showTransferConfirmationPopup = true;
    });
  }

  gotoBack() {
    this.router.navigate(['dashboard/e-warranty']);
  }
}
