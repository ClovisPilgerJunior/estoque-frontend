import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ProdutoPerda } from '../models/ProdutoPerda';

@Injectable({
  providedIn: 'root'
})
export class ProdutoPerdaService {

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<ProdutoPerda> {
    return this.http.get<ProdutoPerda>(`${API_CONFIG.baseUrl}/produtoPerda/${id}`)
  }


  findAll(): Observable<ProdutoPerda[]> {
    return this.http.get<ProdutoPerda[]>(`${API_CONFIG.baseUrl}/produtoPerda`)
  }

  create(ProdutoPerda: ProdutoPerda): Observable<ProdutoPerda> {
    return this.http.post<ProdutoPerda>(`${API_CONFIG.baseUrl}/produtoPerda/cadastrar`, ProdutoPerda)
  }

  update(ProdutoPerda: ProdutoPerda): Observable<ProdutoPerda> {
    return this.http.put<ProdutoPerda>(`${API_CONFIG.baseUrl}/produtoPerda/atualizar/${ProdutoPerda.id}`, ProdutoPerda)
  }

  delete(id: Number): Observable<ProdutoPerda>{
    return this.http.delete<ProdutoPerda>(`${API_CONFIG.baseUrl}/produtoPerda/deletar/${id}`)
  }
}
