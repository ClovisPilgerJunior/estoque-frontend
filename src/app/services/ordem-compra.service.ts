import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { OrdemCompra } from './../models/OrdemCompra';
import { ItemOrdemCompra } from '../models/ItemOrdemCompra';

@Injectable({
  providedIn: 'root'
})
export class OrdemCompraService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<OrdemCompra> {
    return this.http.get<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/${id}`)
  }

  findAll(): Observable<OrdemCompra[]> {
    return this.http.get<OrdemCompra[]>(`${API_CONFIG.baseUrl}/ordemCompra`)
  }

  findAllItemsOrder(id: number): Observable<ItemOrdemCompra[]> {
    return this.http.get<ItemOrdemCompra[]>(`${API_CONFIG.baseUrl}/ordemCompra/${id}/getOrderItems`)
  }

  create(OrdemCompra: OrdemCompra): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra`, OrdemCompra);
  }
  
  faturar(id: number): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/${id}/faturar`, OrdemCompra)
  }

  estornar(id: number): Observable<OrdemCompra> {
    return this.http.post<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/${id}/estornar`, OrdemCompra)
  }

  adicionar(id: number, itens: ItemOrdemCompra[]): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/ordemCompra/${id}/addProducts`, itens);
  }
  
  update(id: number, fornecedorId: number, itens: ItemOrdemCompra[]): Observable<any> {
    const updateData = {
       fornecedorId: fornecedorId,
       items: itens
    };
    return this.http.put<ItemOrdemCompra[]>(`${API_CONFIG.baseUrl}/ordemCompra/${id}/updateOrder`, updateData);
   }
   

  delete(id: Number): Observable<OrdemCompra>{
    return this.http.delete<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/deletar/${id}`)
  }

}
