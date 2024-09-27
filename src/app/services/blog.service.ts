import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogEntryDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://localhost:7143/api/BlogEntry'; // Your API URL

  constructor(private http: HttpClient) { }

  getAllEntries(): Observable<BlogEntryDTO[]> {
    return this.http.get<BlogEntryDTO[]>(this.apiUrl);
  }

  getAllAuthorEntries(userId: number): Observable<BlogEntryDTO[]> {
    return this.http.get<BlogEntryDTO[]>(`${this.apiUrl}/users/${userId}`);
  }

  getEntry(id: number): Observable<BlogEntryDTO> {
    return this.http.get<BlogEntryDTO>(`${this.apiUrl}/${id}`);
  }

  createEntry(entry: BlogEntryDTO): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }

  updateEntry(entry: BlogEntryDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/${entry.id}`, entry);
  }

  deleteEntry(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  associateEntryWithCategory(entryId: number, categoryId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${entryId}/categories/${categoryId}`, {});
  }
}
