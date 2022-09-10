import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallationService } from 'src/app/core/services/service-installation/service-installation.service';

@Component({
  selector: 'app-check-warranty-status',
  templateUrl: './check-warranty-status.component.html',
  styleUrls: ['./check-warranty-status.component.css']
})
export class CheckWarrantyStatusComponent implements OnInit {

  @Input() serialNumber: string;
  constructor(private installationService: InstallationService, private router: Router, private route: ActivatedRoute) { }

  warrantyData: any;
  isSerialNumberValid = false;
  showAlert: boolean;
  ngOnInit(): void {
    if (!this.serialNumber) {
      this.route.queryParams.subscribe((params: any) => {
        console.log('route param id', params);
        const { scannedSerialNumber } = params;
        if (scannedSerialNumber) {
          this.serialNumber = scannedSerialNumber;
          this.sendSerialNumber();
        }

      })
    }
  }

  sendSerialNumber() {
    if (this.serialNumber) {
      this.isSerialNumberValid = false;
      this.installationService.checkSerialNumberStatus(this.serialNumber).subscribe(data => {
        console.log('scan api', data)
        if (data && data.length > 0) {
          this.warrantyData = data && data[0];
        } else {
          this.showAlert = true;
        }
      });
    }else{
      this.isSerialNumberValid = true;
    }

  }

  redirectToScan() {
    this.router.navigate(['/dashboard/e-warranty/open-qr-code'], { queryParams: { 'fromPage': 'checkWarrantyStatus' } })
  }

}
