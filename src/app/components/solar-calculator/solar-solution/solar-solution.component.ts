import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-solar-solution',
  templateUrl: './solar-solution.component.html',
  styleUrls: ['./solar-solution.component.css']
})
export class SolarSolutionComponent implements OnInit {

  constructor(private router: Router,private _location: Location) { }
  solarSolution:any;
  ngOnInit(): void {
    this.solarSolution=JSON.parse(sessionStorage.getItem('solar-solution')|| '')
  }

  knowMore(){
       console.log('ongrid called');
      this.router.navigate(['dashboard/solar-calculator/solar-features']);
    
  }

  back(){
    this._location.back();
  }

}
