import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../_models/category';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  baseUrl = 'http://localhost:5104/api/Category';
  proByCat = `/ProductByCategory?`;
  pagination = `page=1&pageSize=100`;
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(this.baseUrl);
  }
  getProductsByCat(id: number) {
    return this.http.get<any>(this.baseUrl + this.proByCat + `categoryId=${id}&` + this.pagination);
  }
}
