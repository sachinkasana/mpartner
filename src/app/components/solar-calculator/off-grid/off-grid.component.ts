import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-off-grid',
  templateUrl: './off-grid.component.html',
  styleUrls: ['./off-grid.component.css']
})
export class OffGridComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  selectHomeAppliance(){
    this.router.navigate(['dashboard/solar-calculator/select-appliance']);

  }

  selectManually(){
    this.router.navigate(['dashboard/solar-calculator/off-grid-calculator']);

  }
}
