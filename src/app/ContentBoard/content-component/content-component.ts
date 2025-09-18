import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderServices } from '../../_services/order-services';


@Component({
  selector: 'app-content-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-component.html',
  styleUrls: ['./content-component.css'],
})
export class ContentComponent implements OnInit {
  constructor(public orderServices:OrderServices){}
  ngOnInit(): void {
    
  }

}
