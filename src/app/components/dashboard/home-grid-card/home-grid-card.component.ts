import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-grid-card',
  templateUrl: './home-grid-card.component.html',
  styleUrls: ['./home-grid-card.component.css']
})
export class HomeGridCardComponent implements OnInit {
  @Input('homeGridCards')homeGridCards:any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.homeGridCards)
  }

  

}
