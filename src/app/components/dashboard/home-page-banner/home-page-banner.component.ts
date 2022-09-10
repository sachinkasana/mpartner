import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-banner',
  templateUrl: './home-page-banner.component.html',
  styleUrls: ['./home-page-banner.component.css']
})
export class HomePageBannerComponent implements OnInit {

  @Input() bannerData:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectHeader(nav:any){
    if(nav.ModuleName.toLowerCase()==="luminous youtube"){
      this.router.navigate(['/dashboard/youtube'])
    }
    else if(nav.ModuleName.toLowerCase()==="ad creator"){
      this.router.navigate(['/dashboard/ads-creator'])
    }
   else if(nav.ModuleName.toLowerCase()==="solar calculator"){
      this.router.navigate(['/dashboard/solar-calculator']);
    }else {
      console.log('No route found for this option');
    }
  }

}
