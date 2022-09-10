import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css']
})
export class ImagePopupComponent implements OnInit {
  @Output()popupClose=new EventEmitter<any>();

  @Input()scratchCardPopup:boolean=false

  displayStyle = "none";

  constructor() { }

  ngOnInit(): void {
    this.displayStyle = "block";

  }

  
  
  closePopup() {
    this.displayStyle = "none";
    this.popupClose.emit();
  }
}
