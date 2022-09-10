import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.css']
})
export class QrCodeScannerComponent implements OnInit {
  arr:any=[];
  fromPage='';
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params:any)=>{
      console.log('route param id', params);
      this.fromPage = params.fromPage;
      
    })
    //for testing
    // this.arr.push('XYZAT5g1500006');
    //localStorage.setItem('scannedValue',JSON.stringify(this.arr));
  }
  availableDevices: MediaDeviceInfo[];
  deviceCurrent: any;
  deviceSelected: string;
  scannedSerialNumbers:any=[];
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private router:Router,private route:ActivatedRoute) { }

  clearResult(): void {
    this.qrResultString = '';
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    let url='';
    //alert(`serial number ${this.scannedSerialNumbers}`);
    if(this.fromPage=='serviceInstallation'){
      url='dashboard/service-installation/servey-request'
    }
    else if(this.fromPage=='checkWarrantyStatus'){
      url='dashboard/check-warranty';
    }
    else{
      url='dashboard/e-warranty/scanned-qr-code';
    }
    this.router.navigate([url],{queryParams: { 'scannedSerialNumber':resultString}})
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    // this._dialog
    //   .open(FormatsDialogComponent, { data })
    //   .afterClosed()
    //   .subscribe(x => {
    //     if (x) {
    //       this.formatsEnabled = x;
    //     }
    //   });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

   // this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

}
