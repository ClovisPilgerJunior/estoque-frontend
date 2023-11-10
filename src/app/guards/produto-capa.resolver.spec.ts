import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { produtoCapaResolver } from './produto-capa.resolver';

describe('produtoCapaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => produtoCapaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
