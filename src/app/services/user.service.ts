import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${API_CONFIG.baseUrl}/user/${id}`)
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/user`)
  }

  create(User: User): Observable<User> {
    return this.http.post<User>(`${API_CONFIG.baseUrl}/user/cadastrar`, User)
  }

  update(User: User): Observable<User> {
    return this.http.put<User>(`${API_CONFIG.baseUrl}/user/atualizar/${User.id}`, User)
  }

}
