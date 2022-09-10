import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqData:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getFAQData();
  }

  getFAQData(){
    this.userService.getFAQ().subscribe((res) => {
      if (res && res.Status === '200') {
        this.faqData=res.faq_data;
      } else {
        alert(res.Message);
      }
    });
  }

}
