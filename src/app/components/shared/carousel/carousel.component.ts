import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit,AfterViewInit {
@Input('bannerCardsList')bannerCardsList:any

@ViewChild('carousel') private _carousel: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const myCarousel = this._carousel.nativeElement;
   const carousel = $(myCarousel).carousel();
  }

}
