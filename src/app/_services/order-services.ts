import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from '../CheckOut/check-component/check-component';

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl:string;
  quantity: number;
  unitPrice: number;
  total: number;
}
export interface GetOrderDto {
  id: number;
  userId: string;
  paymentMethod: string;
  orderDate: string;
  orderState: string;
  custInfo: custInfo;
  orderItems: OrderItem[];
}
export interface custInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  baseUrl = `http://localhost:5104/api/Order`;
  constructor(private http:HttpClient){}

  CreateOrder(model:object) {
    return this.http.post<{id:number}>(this.baseUrl,model);
  }

  GetOrderById(id:number) {
    return this.http.get(this.baseUrl + `/` + id)
  }

  GetAllOrder() {
    return this.http.get<GetOrderDto[]>(this.baseUrl)
  }
}
