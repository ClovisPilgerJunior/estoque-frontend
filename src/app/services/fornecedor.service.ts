import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Fornecedor } from '../models/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/${id}`)
  }

  findByName(name: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${API_CONFIG.baseUrl}/name/fornecedor/${name}`)
  }

  findAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${API_CONFIG.baseUrl}/fornecedor`)
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/cadastrar`, fornecedor)
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/atualizar/${fornecedor.id}`, fornecedor)
  }

  delete(id: Number): Observable<Fornecedor> {
    return this.http.delete<Fornecedor>(`${API_CONFIG.baseUrl}/fornecedor/deletar/${id}`)
  }

}
