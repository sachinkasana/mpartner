import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.css']
})
export class ScanQrCodeComponent implements OnInit {

  showOTPPopup = false;
  otpInput: any;
  isOtpInputValid = false;
  saleDate: string;
  scannedOptions: any;
  selectedSerialNumber: any;
  serailNumbers: any = [];
  constructor(private activatedRoute: ActivatedRoute, private ewarranty: EWarrantyService, private storageService: StorageService, private router: Router, private globalService: GlobalService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.selectedSerialNumber = params.scannedSerialNumber;
    })
    this.getScannedOptions();
  }

  getScannedOptions() {
    this.ewarranty.getScanOption().subscribe((data: any) => {
      this.scannedOptions = data.Data[0];
      const savedSearilNumber = this.storageService.getItem('serialNumbers');
      console.log('savedSearilNumber', savedSearilNumber)
      if (savedSearilNumber) {
        this.serailNumbers = savedSearilNumber;
      }

      if (this.selectedSerialNumber) {
        this.submit();
      }
      console.log('scna options api', data);
    })
  }

  submit() {
    const sale_date = this.storageService.getItem("Saledate");
    this.saleDate = sale_date;

    const mobile = this.storageService.getItem("mobile");
    const userid = this.storageService.getItem("userId");
    this.ewarranty.updateScannedSerialNos(this.selectedSerialNumber, mobile, sale_date).subscribe((data: any) => {
      console.log('updateScannedSerialNos', data);
      if (data[0].wrs_entry_status == 'ok') {
        if (this.serailNumbers.findIndex((item: any) => item.serialNumber == this.selectedSerialNumber) == -1) {
          this.serailNumbers.push({ 'serialNumber': this.selectedSerialNumber, 'name': data[0].wrs_primary_details });
          this.storageService.setItem('serialNumbers', this.serailNumbers)
        }
        console.log('serailNumbers', this.serailNumbers);
        if (this.scannedOptions.option == 'single') {
          this.generateOTP()
        }
      } else {
        this.toaster.error(data[0].wrs_entry_status);
      }
    })
  }

  generateOTP() {
    const mobile = this.storageService.getItem("saleDateMobile");
    const userid = this.storageService.getItem("userId");
    let serailNumbers = this.serailNumbers.map(function (elem: any) {
      return elem.serialNumber;
    }).join(",");
    this.ewarranty.createSerialOtp(serailNumbers, mobile, userid).subscribe((otpResp: any) => {
      console.log('otp resp', otpResp);
      if (otpResp && otpResp.Code === 'SUCCESS') {
        this.storageService.setItem("TransID", otpResp.TransID);
        this.showOTPPopup = true;
      }

    })
  }

  submitOtp() {
    if (this.otpInput) {
      this.isOtpInputValid = false;
      let serailNumbers = this.serailNumbers.map(function (elem: any) {
        return elem.serialNumber;
      }).join(",");
      const mobile = this.storageService.getItem("saleDateMobile");
      const userid = this.storageService.getItem("userId");
      const TransID = this.storageService.getItem("TransID");
      console.log(this.otpInput);
      this.ewarranty.verifySerialOtp(serailNumbers, mobile, userid, this.otpInput, TransID).subscribe((data: any) => {
        console.log('verify otp data', data);
        if (data && data.Code === 'SUCCESS') {
          this.saveWarrantyDetails(serailNumbers, mobile, userid, TransID, this.otpInput);
          //this.router.navigate(['dashboard/e-warranty/serial-number-list'])
        }
      })
    } else {
      this.isOtpInputValid = true;
    }

  }

  saveWarrantyDetails(serialNo: string, mobile: string, userid: string, TransID: string, ew_otpInput: string) {
    const obj = {
      "SerialNo": serialNo,
      "DisCode": userid,
      "SaleDate": this.saleDate,
      "CustomerPhone": mobile.toString(),
      "LogDistyId": userid,
      "EW_isVerified": "1",
      "EW_ViaVerified": "WITH_OTP",
      "EW_VerifiedBy": userid,
      "TransID": TransID,
      "EW_OTP": ew_otpInput.toString(),
      "EW_IMEI": "a9c4c0ddaa92ca15",
      "token": "pass@1234"
    }

    console.log('save with otp obj', obj);
    this.ewarranty.saveWarrantyWithOTP(obj).subscribe((data: any) => {
      console.log('warranty saved details', data);
      this.globalService.setWarrantyData(data);
      this.router.navigate(['dashboard/e-warranty/serial-number-list'])
      // serial no list
    })
  }

  clickWithoutWarranty() {
    this.router.navigate(['dashboard/e-warranty/consumer-detail']);
  }

  openQRCode() {
    this.router.navigateByUrl('dashboard/e-warranty/open-qr-code')
  }

  deleteSerialNumber(index: any) {
    this.serailNumbers.splice(index, 1);
  }

  closePopup() {
    this.showOTPPopup = false;
    this.serailNumbers = [];
    this.storageService.removeItem('serialNumbers');
    this.router.navigateByUrl('dashboard/e-warranty/scanned-qr-code')
  }
}
