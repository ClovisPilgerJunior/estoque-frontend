import { ProdutoCapa } from './../models/ProdutoCapa';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { ProdutoCapaCalculated } from '../models/ProdutoCapaCalculated';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCapaService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<ProdutoCapa> {
    return this.http.get<ProdutoCapa>(`${API_CONFIG.baseUrl}/produtoCapa/${id}`)
  }

  findAllCalculated(): Observable<ProdutoCapaCalculated[]> {
    return this.http.get<ProdutoCapaCalculated[]>(`${API_CONFIG.baseUrl}/produtoCapa/calculado`)
  }

  findAll(): Observable<ProdutoCapa[]> {
    return this.http.get<ProdutoCapa[]>(`${API_CONFIG.baseUrl}/produtoCapa`)
  }

  create(ProdutoCapa: ProdutoCapa): Observable<ProdutoCapa> {
    return this.http.post<ProdutoCapa>(`${API_CONFIG.baseUrl}/produtoCapa/cadastrar`, ProdutoCapa)
  }

  update(ProdutoCapa: ProdutoCapa): Observable<ProdutoCapa> {
    return this.http.put<ProdutoCapa>(`${API_CONFIG.baseUrl}/produtoCapa/atualizar/${ProdutoCapa.id}`, ProdutoCapa)
  }

  delete(id: Number): Observable<ProdutoCapa>{
    return this.http.delete<ProdutoCapa>(`${API_CONFIG.baseUrl}/produtoCapa/deletar/${id}`)
  }

}
