import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ProdutoEntrada } from '../models/ProdutoEntrada';

@Injectable({
  providedIn: 'root'
})
export class ProdutoEntradaService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<ProdutoEntrada> {
    return this.http.get<ProdutoEntrada>(`${API_CONFIG.baseUrl}/produtoEntrada/${id}`)
  }


  findAll(): Observable<ProdutoEntrada[]> {
    return this.http.get<ProdutoEntrada[]>(`${API_CONFIG.baseUrl}/produtoEntrada`)
  }

  create(ProdutoEntrada: ProdutoEntrada): Observable<ProdutoEntrada> {
    return this.http.post<ProdutoEntrada>(`${API_CONFIG.baseUrl}/produtoEntrada/cadastrar`, ProdutoEntrada)
  }

  update(ProdutoEntrada: ProdutoEntrada): Observable<ProdutoEntrada> {
    return this.http.put<ProdutoEntrada>(`${API_CONFIG.baseUrl}/produtoEntrada/atualizar/${ProdutoEntrada.id}`, ProdutoEntrada)
  }

  delete(id: Number): Observable<ProdutoEntrada>{
    return this.http.delete<ProdutoEntrada>(`${API_CONFIG.baseUrl}/produtoEntrada/deletar/${id}`)
  }
}
