import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetOrderDto, OrderServices } from '../../../_services/order-services';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { OrderDto } from '../../../CheckOut/check-component/check-component';



@Component({
  selector: 'app-order-success-component',
  imports: [RouterLink, DatePipe, CommonModule],
  templateUrl: './order-success-component.html',
  styleUrl: './order-success-component.css',
})
export class OrderSuccessComponent implements OnInit,OnDestroy {
  sub?:Subscription;
  order: OrderDto | null = null;
  totalAmount: number = 0;

  constructor(
    public orderServices: OrderServices,
    public activatedRouter: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
   this.sub = this.activatedRouter.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.orderServices.GetOrderById(+id).subscribe({
          next: (res: any) => {
            this.order = res;

            this.totalAmount =
              this.order?.items?.reduce((sum, item) => sum + item.quantity * (item.unitPrice ?? 0),0) || 0;
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
  get dateShip(): Date {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today;
  }
}


