import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetOrderDto, OrderItem, OrderServices } from '../../_services/order-services';
import { LoadingService } from '../../_services/loading-service';
import { SpinnerComponent } from '../../core/spinner/spinner-component/spinner-component';

@Component({
  selector: 'app-my-order-component',
  imports: [DatePipe, CommonModule, SpinnerComponent],
  templateUrl: './my-order-component.html',
  styleUrl: './my-order-component.css',
})
export class MyOrderComponent implements OnInit {
  orders: GetOrderDto[] = [];
  totalAmount: number = 0;

  constructor(
    public orderServices: OrderServices,
    public loading: LoadingService
  ) {}
  ngOnInit(): void {
    this.orderServices.GetAllOrder().subscribe({
      next: (res) => {
        this.orders = res;
      },
    });
  }

  getEstimatedArrival(date: string): Date {
    const orderDate = new Date(date);
    orderDate.setDate(orderDate.getDate() + 3);
    return orderDate;
  }

  getTotalAmount(order: GetOrderDto): number {
    return (
      (order.orderItems as OrderItem[])?.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      ) || 0
    );
  }
  // get images
  getImageUrl(url: any): string {
    if (!url) return 'logo3.png'; // صورة افتراضية

    const strUrl = String(url); //  forever return it to string

    if (strUrl.startsWith('http')) {
      return strUrl; // from internet
    }

    return 'http://localhost:5104' + strUrl; // from my server
  }
}
