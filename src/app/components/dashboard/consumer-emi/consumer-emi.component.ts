import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consumer-emi',
  templateUrl: './consumer-emi.component.html',
  styleUrls: ['./consumer-emi.component.css']
})
export class ConsumerEmiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
     console.log('emi')
  }


}
