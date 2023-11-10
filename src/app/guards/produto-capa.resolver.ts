import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProdutoCapaService } from '../services/produto-capa.service';
import { Observable } from 'rxjs';
import { ProdutoCapa } from '../models/ProdutoCapa';

export const produtoCapaResolver: ResolveFn<ProdutoCapa> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  ): Observable<ProdutoCapa> => {
  return inject(ProdutoCapaService).findById(route.params['id']);
};
