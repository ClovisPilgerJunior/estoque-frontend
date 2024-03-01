import { OrdemCompra } from './../models/OrdemCompra';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { OrdemCompraCalculated } from '../models/OrdemCompraCalculated';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<OrdemCompra> {
    return this.http.get<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/${id}`)
  }

  findAllItemsOrder(id: number): Observable<OrdemCompra[]> {
    return this.http.get<OrdemCompra[]>(`${API_CONFIG.baseUrl}/${id}/getOrderItems`)
  }

  create(OrdemCompra: OrdemCompra): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra`, OrdemCompra)
  }

  faturar(id: number): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/${id}/faturar`, OrdemCompra)
  }

  estornar(id: number): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/${id}/estornar`, OrdemCompra)
  }

  adicionar(id: number): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/${id}/addProducts`, OrdemCompra)
  }

  update(OrdemCompra: OrdemCompra): Observable<OrdemCompra> {
    return this.http.put<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/atualizar/${OrdemCompra.id}`, OrdemCompra)
  }

  delete(id: Number): Observable<OrdemCompra>{
    return this.http.delete<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/deletar/${id}`)
  }

}
