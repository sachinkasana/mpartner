import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-requirement',
  templateUrl: './select-requirement.component.html',
  styleUrls: ['./select-requirement.component.css']
})
export class SelectRequirementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  offGrid(){
    console.log('off grid called');
    this.router.navigate(['dashboard/solar-calculator/off-grid']);
  }

  onGrid(){
    console.log('ongrid called');
    this.router.navigate(['dashboard/solar-calculator/on-grid']);
  }

}
