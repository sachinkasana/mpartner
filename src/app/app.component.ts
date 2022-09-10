import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { CommonService } from './core/services/common.service';
import { AuthGuardServiceService } from './route-gaurd/auth-guard-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public translate: TranslateService, private router: Router,private authGuardServiceService:AuthGuardServiceService,
    public updates:SwUpdate
  ) {
    const updatesAvailable = updates.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
      })));
      updatesAvailable.subscribe((val)=>{
        console.log('updates available inside',val);
        updates.checkForUpdate().then(()=>{
          updates.activateUpdate().then(() => this.updateApp());
        });
      })
   
    translate.addLangs(['en', 'hi']);
    translate.setDefaultLang('en');
    if (authGuardServiceService.getToken()) {
     // router.navigate(['dashboard']);
    }
  }
  title = 'luminous-pwa';
  updateApp(){
    if(window.confirm('New version of app is available do you want to install?'))
    this.updates.activateUpdate().then((val)=>{
      console.log('SW updated',val)
    })
    document.location.reload();
    console.log("The app is updating right now");

   }
}
