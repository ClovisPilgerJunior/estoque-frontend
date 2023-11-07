import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { fornecedor } from '../models/Fornecedor';
import { FornecedorDTO } from '../models/ProdutoCapa';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<fornecedor> {
    return this.http.get<fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/${id}`)
  }

  findAll(): Observable<fornecedor[]> {
    return this.http.get<fornecedor[]>(`${API_CONFIG.baseUrl}/fornecedor`)
  }

  findAllDTO(): Observable<FornecedorDTO[]> {
    return this.http.get<FornecedorDTO[]>(`${API_CONFIG.baseUrl}/fornecedor`)
  }

  create(fornecedor: fornecedor): Observable<fornecedor> {
    return this.http.post<fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/cadastrar`, fornecedor)
  }

  update(fornecedor: fornecedor): Observable<fornecedor> {
    return this.http.put<fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/atualizar/${fornecedor.id}`, fornecedor)
  }

  delete(id: Number): Observable<fornecedor> {
    return this.http.delete<fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/deletar/${id}`)
  }

}
