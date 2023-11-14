import { TestBed } from '@angular/core/testing';

import { ProdutoEntradaService } from './produto-entrada.service';

describe('ProdutoEntradaService', () => {
  let service: ProdutoEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
