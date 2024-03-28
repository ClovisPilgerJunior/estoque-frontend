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

  generateReport(idOrdemCompra: number) {
    const url = `http://localhost:8080/generate-report?ID_ORDEM_COMPRA=${idOrdemCompra}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  updatePrevisaoEntrega(id: number, newPrevisaoEntrega: Date): Observable<any> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/atualizar-data-previsao`, { dataPrevisaoEntrega: newPrevisaoEntrega });
 }

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

  faturar(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/faturar`, null, { responseType: 'text' });
  }

  estornar(id: number): Observable<string> {
    return this.http.post(`${API_CONFIG.baseUrl}/ordemCompra/${id}/estornar`, null, { responseType: 'text' });
  }

  liberar(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/liberar`, null, { responseType: 'text' });
  }

  devolver(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/devolver`, null, { responseType: 'text' });
  }

  revisar(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/revisar`, null, { responseType: 'text' });
  }

  realizarPedido(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/realizarPedido`, null, { responseType: 'text' });
  }

  cancelar(id: number): Observable<string> {
    return this.http.put(`${API_CONFIG.baseUrl}/ordemCompra/${id}/cancelar`, null, { responseType: 'text' });
  }

  adicionar(id: number, itens: ItemOrdemCompra[]): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/ordemCompra/${id}/addProducts`, itens);
  }

  update(id: number, numeroNotaOrdem: number, ordemObservacao: string, fornecedorId: number, itens: ItemOrdemCompra[], nomeSolicitante: string, dataPrevisaoEntrega: Date): Observable<any> {
    const updateData = {
      fornecedorId: fornecedorId,
      items: itens,
      numeroNotaOrdem: numeroNotaOrdem, // Certifique-se de incluir o número da nota
      ordemObservacao: ordemObservacao, // Certifique-se de incluir a observação da ordem
      nomeSolicitante: nomeSolicitante,
      dataPrevisaoEntrega: dataPrevisaoEntrega,
    };
    return this.http.put<ItemOrdemCompra[]>(`${API_CONFIG.baseUrl}/ordemCompra/${id}/updateOrder`, updateData);
  }


  delete(id: Number): Observable<OrdemCompra> {
    return this.http.delete<OrdemCompra>(`${API_CONFIG.baseUrl}/ordemCompra/deletar/${id}`)
  }

}
