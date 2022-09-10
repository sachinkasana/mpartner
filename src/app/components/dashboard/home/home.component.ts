import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HomeService } from '../../../core/services/home/home.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  popupNotification: any = [];
  lssWeek: any;
  homeOneImage: any;
  homeMoreCard: any;
  homeGridCards: any;

  bannerCardsList = [];
  sideMenuList = [];
  agreementPopupShow = false;
  homePopupShow = false;
  checkedAgreement = false;
  scrollable = true;
  @ViewChild('content') content: ElementRef;

  warrantyAgreementString: string;
  agreementId: string;
  Bottom_Menu: any;
  Header_Menu: any;
  constructor(
    private homeService: HomeService,
    private storageService: StorageService,
    private renderer: Renderer2,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    console.log(this.mobileQuery)
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const showAlerts = this.storageService.getItem('showAlerts');

    this.homeService.getUpperSideMenu().subscribe((res) => {
      if (res && res.Status === '200') {
        const { permission_data } = res;
        this.Bottom_Menu = permission_data.Bottom_Menu;
        this.sideMenuList = permission_data.Side_Menu;
        this.Header_Menu = permission_data.Upper_Menu;
      } else {
        alert(res.Message);
      }
    });

    this.homeService.getHomePageCards().subscribe((cards) => {
      if (cards && cards.Status === '200') {
        this.bannerCardsList = cards.dynamic_home_page[0].Bannercard_data;
        this.homeGridCards = cards.dynamic_home_page[1];
        this.homeMoreCard = cards.dynamic_home_page[2];
        this.homeOneImage = cards.dynamic_home_page[3];
      } else {
        alert(cards.Message);
      }
    });

    this.homeService.getEwarrantyPointReductionAgreement().subscribe((res) => {
      if (res && res.Status === '200') {
        this.warrantyAgreementString =
          res && res.point_reduction_agreement[0].Agreement;
        this.agreementId = res && res.point_reduction_agreement[0].Id;
        this.agreementPopupShow = !!this.warrantyAgreementString;
        this.setAlerts();
      } else {
        this.agreementPopupShow = false;
        console.log(res.Message);
      }
    });

    this.homeService.getLssWeek().subscribe((res) => {
      console.log('LSS week response', res);
      if (res && res.Status == '200') {
        this.lssWeek = res;
      } else {
        console.log('Lss Week API error', res);
      }
    })

    if (!showAlerts) {
      this.homeService.getAlertnotification().subscribe((res) => {
        if (res && res.Status === '200') {
          this.popupNotification = [...this.popupNotification, ...res.survey_notification_alert];
          this.storageService.setItem('showAlerts', true);
          console.log('popup notofications', this.popupNotification);
        } else {
          console.log(res.Message);
        }
      });
    }
  }


  setAlerts() {
    if (this.warrantyAgreementString) {
      this.content.nativeElement.innerHTML = this.warrantyAgreementString;
    }

  }

  closeImagePop(type: any) {
    if (type == 'video') {
      this.videoPlayer.nativeElement.remove();

    }
  }

  onChangeAgreement(ev: any) {
    this.checkedAgreement = ev.checked;
  }

  submitAgreement() {
    console.log('submit called', this.checkedAgreement);
    const obj = {
      "Id": this.agreementId
    }
    this.homeService.saveEwarrantyPointReductionAgreement(obj).subscribe((data: any) => {
      //console.log('save agreeement', data);
      if (data && data.Status == '200') {
        this.agreementPopupShow = false;
      } else {
        console.log('save agreement api error', data.Message);
      }

    })
  }
}
