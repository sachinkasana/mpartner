import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-schemes-card',
  templateUrl: './schemes-card.component.html',
  styleUrls: ['./schemes-card.component.css'],
})
export class SchemesCardComponent implements OnInit {
  constructor(private userService: UserService) {}
  schemeList: any;
  ngOnInit(): void {
    try {
      this.userService.getSchemePageCards('DEALER').subscribe((res) => {
        if (res && res.Status === '200') {
          this.schemeList = res && res.scheme_data;
        } else {
          console.log(res.Message);
        }
      });
    } catch (e) {
      console.log('Exception occured scheme card', e);
    }
  }
}
