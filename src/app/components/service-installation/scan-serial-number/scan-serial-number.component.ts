import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstallationService } from 'src/app/core/services/service-installation/service-installation.service';

@Component({
  selector: 'app-scan-serial-number',
  templateUrl: './scan-serial-number.component.html',
  styleUrls: ['./scan-serial-number.component.css']
})
export class ScanSerialNumberComponent implements OnInit {

  @Input() serialNumber: string;
  constructor(private installationService: InstallationService,
    private router: Router, private route: ActivatedRoute,
    private toaster: ToastrService) { }

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

  serialNumberChange(input:any){
    if(input.length <1){
      this.router.navigateByUrl('dashboard/service-installation/scan-serail-number');
    }
    this.serialNumber = input;
  }

  sendSerialNumber() {
    if(!this.serialNumber){
      this.toaster.error('Please enter serial number');
      return;
    }
    this.installationService.scanSerialNumber(this.serialNumber).subscribe(data => {
      console.log('scan api', data)
      if (data.Status !== "200") {
        this.toaster.error(data.Message)
        return;
      }

      this.installationService.setModelName(data.Data[0].Model_Name)
      this.installationService.setModelName(data.Data[0].Product_Type);
      this.router.navigate(['dashboard/service-installation/servey-request'],
        {
          queryParams: {
            'Model_Name': data.Data[0].Model_Name, 'Product_Type': data.Data[0].Product_Type,
            'serialNumber': this.serialNumber
          },
          queryParamsHandling: 'merge'
        })
    });
  }

  redirectToScan() {
    this.router.navigate(['/dashboard/e-warranty/open-qr-code'], { queryParams: { 'fromPage': 'serviceInstallation' } })
  }

}
