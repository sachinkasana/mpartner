import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private router: Router,private globalService:GlobalService) { }
  inputKey: string;
  ngOnInit(): void {
  }

  search(){
    console.log('key', this.inputKey);
    if(this.inputKey.length > 2){
      this.router.navigate(['dashboard/catalog/detail'],{ queryParams: { key: this.inputKey }});
    }
  }

  closeSearchBar(){
    this.globalService.setData(false);
  }

}
