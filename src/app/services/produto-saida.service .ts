import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ProdutoSaida } from '../models/ProdutoSaida';

@Injectable({
  providedIn: 'root'
})
export class ProdutoSaidaService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<ProdutoSaida> {
    return this.http.get<ProdutoSaida>(`${API_CONFIG.baseUrl}/produtoSaida/${id}`)
  }


  findAll(): Observable<ProdutoSaida[]> {
    return this.http.get<ProdutoSaida[]>(`${API_CONFIG.baseUrl}/produtoSaida`)
  }

  create(ProdutoSaida: ProdutoSaida): Observable<ProdutoSaida> {
    return this.http.post<ProdutoSaida>(`${API_CONFIG.baseUrl}/produtoSaida/cadastrar`, ProdutoSaida)
  }

  update(ProdutoSaida: ProdutoSaida): Observable<ProdutoSaida> {
    return this.http.put<ProdutoSaida>(`${API_CONFIG.baseUrl}/produtoSaida/atualizar/${ProdutoSaida.id}`, ProdutoSaida)
  }

  delete(id: Number): Observable<ProdutoSaida>{
    return this.http.delete<ProdutoSaida>(`${API_CONFIG.baseUrl}/produtoSaida/deletar/${id}`)
  }
}
