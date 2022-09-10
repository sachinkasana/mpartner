import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private _mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  @Input()sharePdf=false;
  @Input()disclaimerFlag=false;
  @Output()popupClose=new EventEmitter<any>();
  @Input() headerFlag:boolean=false;
  @Input() footerFlag:boolean=false;
  @Input()scrollable:boolean=false;

  displayStyle = "none";

  constructor(changeDetectorRef: ChangeDetectorRef,media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 799px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit(): void {
    this.displayStyle = "block";

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
  
  closePopup() {
    this.displayStyle = "none";
    this.popupClose.emit(true);
  }

}
