import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  constructor(private http: HttpClient) {}
  baseUlr = 'http://localhost:5104/api/product';

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUlr);
  }

  getById(id: number) {
    return this.http
      .get<{ data: Product }>(this.baseUlr + `/` + id)
      .pipe(map((res) => res.data));
  }

  getRatingProducts() {
    return this.http.get<Product[]>(this.baseUlr + `/Rating`);
  }

  DeleteProduct(id: number) {
    return this.http.delete(this.baseUlr + `?id=${id}`);
  }

  EditeProduct(id: number, model: object) {
    return this.http.put(this.baseUlr + `/` + id, model);
  }

  AddProduct(model: object) {
    return this.http.post(this.baseUlr + `/add-product`, model);
  }

  UploadPhoto(formData: FormData) {
    return this.http.post(this.baseUlr + `/upload-photo`, formData);
  }
}
