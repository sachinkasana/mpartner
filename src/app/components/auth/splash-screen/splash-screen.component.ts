import { Component, OnInit,Input } from '@angular/core';
import { SplashAnimationType } from "./splash-animation-type";
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  windowWidth: string='';
  splashTransition: string='';
  opacityChange: number = 1;
  showSplash = true;
constructor(private router:Router){
  // it will be null if it doesn't exist
  const isShowSplash = sessionStorage.getItem('isShowSplash');
  if(window.innerWidth>768){
    this.showSplash=false;
    this.router.navigateByUrl('/language');
  }
  if (isShowSplash) {
      // don't show splash 
      this.showSplash = false;
      this.router.navigateByUrl('/language');
  } else {
      // show splash 
      this.showSplash = true;
  }
  sessionStorage.setItem('isShowSplash', JSON.stringify(false));
}
  

  @Input() animationDuration: number = 0.5;
  @Input() duration: number = 5;
  @Input() animationType: SplashAnimationType = SplashAnimationType.SlideLeft;

  ngOnInit(): void {
    setTimeout(() => {
      console.log('inside timeoit')
      let transitionStyle = "";
      switch (this.animationType) {
        case SplashAnimationType.SlideLeft:
          this.windowWidth = "-" + window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.SlideRight:
          this.windowWidth = window.innerWidth + "px";
          transitionStyle = "left " + this.animationDuration + "s";
          break;
        case SplashAnimationType.FadeOut:
          transitionStyle = "opacity " + this.animationDuration + "s";
          this.opacityChange = 0;
      }

      this.splashTransition = transitionStyle;

      setTimeout(() => {
        this.showSplash = !this.showSplash;
        this.router.navigateByUrl('/language')
      }, this.animationDuration * 1000);
    }, this.duration * 1000);
  }

}
