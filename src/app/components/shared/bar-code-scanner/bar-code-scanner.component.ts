import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent } from "ngx-barcode-scanner";

@Component({
  selector: 'app-bar-code-scanner',
  templateUrl: './bar-code-scanner.component.html',
  styleUrls: ['./bar-code-scanner.component.css']
})
export class BarCodeScannerComponent implements AfterViewInit {

  constructor() { }

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue:any;

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result:any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started:any) {
    console.log(started);
  }
}
