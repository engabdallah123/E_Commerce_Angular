import { Component, OnInit } from '@angular/core';
import { GetOrderDto, OrderItem, OrderServices } from '../../_services/order-services';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductServices } from '../../_services/product-services';

@Component({
  selector: 'app-orders-component',
  imports: [DatePipe, CommonModule],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  orders: GetOrderDto[] = [];
  totalAmount: number = 0;

  constructor(
    public orderServices: OrderServices,
    public productServices: ProductServices
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
