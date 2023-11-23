import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { UnidadeProdutiva } from '../models/unidadeProdutiva';

@Injectable({
  providedIn: 'root'
})
export class UnidadeProdutivaService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<UnidadeProdutiva> {
    return this.http.get<UnidadeProdutiva>(`${API_CONFIG.baseUrl}/unidadeProdutiva/${id}`)
  }

  findAll(): Observable<UnidadeProdutiva[]> {
    return this.http.get<UnidadeProdutiva[]>(`${API_CONFIG.baseUrl}/unidadeProdutiva`)
  }

  create(UnidadeProdutiva: UnidadeProdutiva): Observable<UnidadeProdutiva> {
    return this.http.post<UnidadeProdutiva>(`${API_CONFIG.baseUrl}/unidadeProdutiva/cadastrar`, UnidadeProdutiva)
  }

  update(UnidadeProdutiva: UnidadeProdutiva): Observable<UnidadeProdutiva> {
    return this.http.put<UnidadeProdutiva>(`${API_CONFIG.baseUrl}/unidadeProdutiva/atualizar/${UnidadeProdutiva.id}`, UnidadeProdutiva)
  }

  delete(id: Number): Observable<UnidadeProdutiva>{
    return this.http.delete<UnidadeProdutiva>(`${API_CONFIG.baseUrl}/unidadeProdutiva/deletar/${id}`)
  }
}
