import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global.service';
import { HomeService } from '../../core/services/home/home.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    Bottom_Menu: any;
  
    bannerCardsList=[];
    sideMenuList=[];
    addCreatorMenu = [];
    constructor(private homeService: HomeService, public globalService:GlobalService) {}
  
    ngOnInit(): void {
      this.homeService.getUpperSideMenu().subscribe((res) => {
        console.log('home api response', res);
        if (res && res.Status === '200') {
          const { permission_data } = res;
          this.Bottom_Menu = permission_data.Bottom_Menu;
          this.sideMenuList=permission_data.Side_Menu;
          const upperMenuList = permission_data.Upper_Menu[0];
          this.addCreatorMenu = upperMenuList.filter((item:any)=> item.ModuleName === 'Ad creator');
          console.log('add creator menu', this.addCreatorMenu);
        } else {
          alert(res.Message);
        }
      });
  
  }
}
