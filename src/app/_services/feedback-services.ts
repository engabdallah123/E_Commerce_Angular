import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

 export interface FeedBack {
   id: number;
   customerName: string;
   customerEmail: string;
   message: string;
   type: string;
   date: Date;
   responded:boolean;
 }

@Injectable({
  providedIn: 'root',
})
export class FeedbackServices {
  constructor(private http: HttpClient) {}
  baseUrl = `http://localhost:5104/api/CustomerFeedback`;

  PostFeedBack(model:object) {
    return this.http.post(this.baseUrl,model);
  }

  GetFeedBacks() {
    return this.http.get<FeedBack[]>(this.baseUrl);
  }

  GetFeebBackById(id:number) {
    return this.http.get<FeedBack>(this.baseUrl + `/` + id);
  }

  EditeResponse(id:number,model:object) {
    return this.http.put(this.baseUrl + `/` +id,model);
  }

  DeleteMessage(id:number) {
    return this.http.delete(this.baseUrl + `/${id}`);
  }

}
