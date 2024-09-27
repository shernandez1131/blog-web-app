import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7143/api/User'; // Your API URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getUserProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  updateUserProfile(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.id}`, user);
  }
}
