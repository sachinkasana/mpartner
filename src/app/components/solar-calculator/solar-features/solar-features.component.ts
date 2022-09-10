import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solar-features',
  templateUrl: './solar-features.component.html',
  styleUrls: ['./solar-features.component.css'],
})
export class SolarFeaturesComponent {

  constructor(private _location: Location) { }

  back(){
    this._location.back();
  }
 
}
