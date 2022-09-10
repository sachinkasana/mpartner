import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../../core/services/common.service';
import { Router } from '@angular/router';
import { AuthGuardServiceService } from 'src/app/route-gaurd/auth-guard-service.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  languageList: any;
  selectedLanguage = 'en';
  constructor(
    public translate: TranslateService,
    private service: CommonService,
    private router:Router,
    private authGuardServiceService:AuthGuardServiceService
  ) {}

  ngOnInit(): void {
    this.switchLang(this.selectedLanguage);
    if (this.authGuardServiceService.getToken()) {
      this.router.navigate(['dashboard']);
    }
    this.service.getLanguages().subscribe((response) => {
      this.languageList = response && response.LanguageList;
    });
  }

  public switchLang(lang: string) {
    console.log('lang',lang)
    localStorage.setItem('selectedLang',lang)
    this.translate.use(lang);
  }

  onSubmit(){
    this.router.navigateByUrl('/login')
  }
}
