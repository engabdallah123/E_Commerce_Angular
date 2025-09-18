import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  fullName: string;
  customerID: string;
  email: string;
  phone: string;
  state: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  constructor(private http: HttpClient) {}
  baseUrl = `http://localhost:5104/api/Account`;

  GetAllUser() {
    return this.http.get<User[]>(this.baseUrl);
  }

  DeletUser(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`);
  }
}
