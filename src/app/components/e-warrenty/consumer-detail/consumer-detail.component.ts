import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-consumer-detail',
  templateUrl: './consumer-detail.component.html',
  styleUrls: ['./consumer-detail.component.css']
})
export class ConsumerDetailComponent implements OnInit {

  constructor(private ewarranty: EWarrantyService, private storageService: StorageService, private router: Router, private globalService: GlobalService) { }
  user = {
    "name": "",
    "landline": "",
    "state": "",
    "city": "",
    "address": ""
  };
  validForm = true;
  stateList: any;
  cityList: any;

  ngOnInit(): void {
    this.ewarranty.getStateList().subscribe((data: any) => {
      this.stateList = data;
    })
  }

  onStateChange(state: any) {
    const { StateName } = this.stateList.find((st: any) => st.StateID == state.value);
    this.user.state = StateName;
    this.ewarranty.getCityList(state.value).subscribe((data: any) => {
      this.cityList = data;
    })
  }

  isFormValid(): boolean {
    if (!this.user.address || !this.user.name || !this.user.landline || !this.user.state || !this.user.city) {
      this.validForm = false;
      return false;
    }
    return true;
  }

  submit() {
    console.log('submit called', this.isFormValid());
    if (this.isFormValid()) {
      this.validForm = true;
      const mobile = this.storageService.getItem('mobile');
      const userId = this.storageService.getItem('userId');
      const saleDate = this.storageService.getItem('Saledate');
      const transId = this.storageService.getItem("TransID");
      const savedSearilNumber = this.storageService.getItem('serialNumbers') || [];

      let serailNumbers = savedSearilNumber.map(function (elem: any) {
        return elem.serialNumber;
      }).join(",");

      const customerObj = {
        "CustomerAddress": this.user.address,
        "CustomerCity": this.user.city,
        "CustomerLandLineNumber": this.user.landline.toString(),
        "CustomerName": this.user.name,
        "CustomerPhone": mobile.toString(),
        "CustomerState": this.user.state,
        "DisCode": userId,
        "DlrCode": "",
        "EW_IMEI": "a9c4c0ddaa92ca15",
        "EW_ViaVerified": "Without_OTP",
        "EW_isVerified": "0",
        "LogDistyId": userId,
        "SaleDate": saleDate,
        "SerialNo": serailNumbers,
        "TransID": transId,
        "img": "",
        "ismtype": "no",
        "token": "pass@1234"

      };

      console.log('customer obj', customerObj);

      this.ewarranty.saveCustomerEntrySchemeWithoutOTP(customerObj).subscribe((data: any) => {
        console.log('save cutomer scheeme', data);
        this.globalService.setWarrantyData(data);
        this.router.navigate(['dashboard/e-warranty/serial-number-list'])
      })
    } else {
      this.validForm = false;
    }


  }
  openQRCode() {
    this.router.navigateByUrl('dashboard/e-warranty/open-qr-code')
  }

}
