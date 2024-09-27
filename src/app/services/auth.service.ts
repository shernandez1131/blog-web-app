import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDto, RegisterRequestDto } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7143/api';

  private readonly USER_ID_KEY = 'userId';
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  login(request: LoginRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, request);
  }

  register(request: RegisterRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/register`, request);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.USER_ID_KEY, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearCredentials(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
