import { Component, Input, OnInit } from '@angular/core';
import {Router}from '@angular/router'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input()
  bottom_menu:any;
  activeMenu:string=''
  constructor(private router:Router) { }

  ngOnInit(): void {
    //console.log('bottom menu', this.bottom_menu)
  }

  menuSelected(menu:string){
    if(menu=='Catalog'){
      this.activeMenu=menu;
      console.log(menu+''+this.activeMenu)
      this.router.navigate(['dashboard/catalog'])
    }else if(menu=='Price List'){
      this.activeMenu=menu;
      this.router.navigate(['dashboard/price-list'])

  }
  else if(menu=='Scheme'){
    this.activeMenu=menu;
    this.router.navigateByUrl('dashboard/schemes')
  }
 else if(menu=='eWarranty'){
    this.activeMenu=menu;
    this.router.navigate(['dashboard/e-warranty'])

  

 }
}

}
