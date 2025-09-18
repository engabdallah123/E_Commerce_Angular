import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export interface JwtClaims {
  unique_name?: string;
  email?: string;
  role?: string;
  userID?:string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
  constructor(private http: HttpClient) {}
  baseUrl = `http://localhost:5104/api/Account/`;
  private tokenKey = 'authToken';

  Register(model: object) {
    return this.http.post(this.baseUrl + `SignUp`, model);
  }

  Login(model: object) {
    return this.http.post(this.baseUrl + 'LogIn', model);
  }

  SaveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  GetToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  Logout() {
    localStorage.removeItem(this.tokenKey);
  }

  IsLogged(): boolean {
    return this.GetToken() != null;
  }

  GetClaims(): JwtClaims | null {
    const token = this.GetToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtClaims>(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
