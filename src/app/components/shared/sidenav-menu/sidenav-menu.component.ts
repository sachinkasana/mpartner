import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';
import { CommonService } from '../../../core/services/common.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css'],
})
export class SidenavMenuComponent implements OnDestroy, AfterViewInit {
  confirmShow: boolean = false;
  languageList: any;
  @ViewChild('language') language: ElementRef;

  @Input('Bottom_Menu') Bottom_Menu: any;
  @Input('sideMenuList') sideMenuList: any;
  @Input('addCreatorMenu') addCreatorMenu: any;

  mobileQuery: MediaQueryList;
  showSearch: boolean = false;
  userData: any;
  selectedLang: any;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public globalService: GlobalService,
    private renderer: Renderer2,
    private service: CommonService,
    public translate: TranslateService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 799px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    let selectedLang = localStorage.getItem('selectedLang');
    this.selectedLang = selectedLang || 'en';
    this.getUserProfile();
    this.service.getLanguages().subscribe((response) => {
      console.log('languageList', response.LanguageList);
      this.languageList = response && response.LanguageList;
    });
  }
  public switchLang(lang: string) {
    localStorage.setItem('selectedLang', lang);

    this.translate.use(lang);
    window.location.reload();
  }

  highlight() {
    let matselectValue = this.language.nativeElement.querySelector(
      '.mat-select-value-text'
    );
    this.renderer.setStyle(matselectValue, 'color', 'white');
  }

  ngAfterViewInit() {
    // lang.setStyle.css('color','white')
    //console.log(lang)
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleNav(nav: MatSidenav) {
    if (!nav.opened) {
      nav.open();
    } else {
      this.closeNav(nav);
    }
  }

  closeNav(nav: MatSidenav) {
    // console.log('s')
    nav.close();
  }

  onSearch() {
    this.showSearch = !this.showSearch;
    this.globalService.setData(this.showSearch);
  }

  public onNavClick(nav: any, snav: MatSidenav) {
    this.closeNav(snav);

    if (nav.ModuleName.toLowerCase() === 'logout') {
      this.confirmShow = true;
      // localStorage.clear();
      // this.router.navigateByUrl('/language')
    } else if (nav.ModuleName.toLowerCase() === 'consumer emi') {
      this.router.navigate(['/dashboard/consumer-emi']);
      //this.router.navigateByUrl('/consumer-emi')
    } else if (nav.ModuleName.toLowerCase() === 'luminous youtube') {
      this.router.navigate(['/dashboard/youtube']);
    } else if (nav.ModuleName.toLowerCase() === 'faqs') {
      this.router.navigate(['/dashboard/faq']);
    } else if (nav.ModuleName.toLowerCase() === 'block dealer') {
      this.router.navigate(['/dashboard/dealer-options']);
    } else if (nav.ModuleName.toLowerCase() === 'contact us') {
      this.router.navigate(['/dashboard/contact-us']);
    } else if (nav.ModuleName.toLowerCase() === 'view wrs report') {
      this.router.navigate(['/dashboard/wrs-report']);
    } else if (nav.ModuleName.toLowerCase() === 'book service installation') {
      this.router.navigate(['/dashboard/service-installation']);
    } else if (nav.ModuleName.toLowerCase() === 'block dealer') {
      this.router.navigate(['/dashboard/dealer-options']);
    } else if (
      nav.ModuleName.toLowerCase() === 'check serial no. warranty status'
    ) {
      this.router.navigate(['/dashboard/check-warranty']);
    } else if (nav.ModuleName.toLowerCase() === 'reports') {
      this.router.navigate(['/dashboard/reports']);
    } else if (nav.ModuleName.toLowerCase() === 'service escalation') {
      this.router.navigate(['/dashboard/service-escalation']);
    } else if (nav.ModuleName.toLowerCase() === 'customer complaints') {
      window.open(nav.WatsappLink);
    } else if (
      nav.ModuleName.toLowerCase() === 'battery management and handling rules'
    ) {
      this.router.navigate(['/dashboard/bhmr']);
    } else if (nav.ModuleName.toLowerCase() === 'solar calculator') {
      this.router.navigate(['/dashboard/solar-calculator']);
    } else if (nav.ModuleName.toLowerCase() === 'ad creator') {
      this.router.navigate(['/dashboard/ads-creator']);
    } else if (nav.ModuleName.toLowerCase() == 'catalog') {
      this.router.navigate(['dashboard/catalog']);
    } else if (nav.ModuleName.toLowerCase() == 'price list') {
      this.router.navigate(['dashboard/price-list']);
    } else if (nav.ModuleName.toLowerCase() == 'scheme') {
      this.router.navigateByUrl('dashboard/schemes');
    } else if (nav.ModuleName.toLowerCase() == 'ewarranty') {
      this.router.navigate(['dashboard/e-warranty']);
    }else if (nav.ModuleName.toLowerCase() == 'dealer management') {
      this.router.navigate(['dashboard/dealer-management']);
    }
    
  }

  redirectToHome() {
    this.router.navigateByUrl('dashboard');
  }

  userProfile() {
    this.router.navigate(['/dashboard/user-info']);
  }

  onSearchClose() {
    this.showSearch = false;
    this.globalService.setData(false);
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe((data: any) => {
      console.log('user profile', data);
      if (data && data.Status === '200') {
        this.userData = data;
      } else {
        this.toastr.error(data.Message);
        console.log('User profile api error', data.Message);
      }
    });
  }

  logoutConfirm(confirm: boolean) {
    this.confirmShow = false;
    if (confirm) {
      localStorage.clear();
      this.router.navigateByUrl('/language');
    }
  }
}
