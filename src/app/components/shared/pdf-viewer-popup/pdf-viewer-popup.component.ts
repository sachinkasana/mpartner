import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer-popup',
  templateUrl: './pdf-viewer-popup.component.html',
  styleUrls: ['./pdf-viewer-popup.component.css']
})
export class PdfViewerPopupComponent implements OnInit {
  @Output()sharePdf=new EventEmitter<any>();
  @Input()dowloadUrl:any
  @Output()popupClose=new EventEmitter<any>();
  @Input() headerFlag:boolean=false;
  @Input() footerFlag:boolean=false;
  @Input() showOptions : boolean = true;
  @Input()scrollable:boolean=false;
  displayStyle = "none";
  constructor() { }

  ngOnInit(): void {
    this.displayStyle = "block";

  }

  
  
  closePopup() {
    this.displayStyle = "none";
    this.popupClose.emit(true);
  }

  test(ev:any){
    console.log(ev)

  }


  openSharePdf(){
    console.log('open')
    this.sharePdf.emit(true);

  }
}
