import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EWarrantyService } from 'src/app/core/services/ewarranty/e-warranty.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.css']
})
export class ScanQrCodeComponent implements OnInit {

  showOTPPopup = false;
  constructor(private ewarranty: EWarrantyService, private storageService: StorageService, private router:Router) { }

  ngOnInit(): void {
    this.ewarranty.getScanOption().subscribe((data:any)=>{
      console.log('scna options api', data);
    })
  }

  submit(){
    const serialNo="H4LDCCF1037512";
    //const sale_date = this.storageService.getItem("Saledate").replaceAll("-","/");
    const sale_date = "18/05/2022";
    const mobile = this.storageService.getItem("mobile");
    this.ewarranty.updateScannedSerialNos(serialNo,mobile,sale_date).subscribe((data:any)=>{
      console.log('updateScannedSerialNos', data);
    })
  }

  openQRCode(){
    this.router.navigateByUrl('dashboard/e-warranty/open-qr-code')
  }

}
