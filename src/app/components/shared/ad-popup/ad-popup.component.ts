import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-popup',
  templateUrl: './ad-popup.component.html',
  styleUrls: ['./ad-popup.component.css']
})
export class AdPopupComponent implements OnInit {

  
  @Output()popupClose=new EventEmitter<any>();
  @Input() headerFlag:boolean=false;
  @Input() footerFlag:boolean=false;
  @Input()scrollable:boolean=false;

  displayStyle = "none";

  constructor( ) {
    
   }

  ngOnInit(): void {
    this.displayStyle = "block";

  }

   

  
  
  closePopup() {
    this.displayStyle = "none";
    this.popupClose.emit(true);
  }
}
