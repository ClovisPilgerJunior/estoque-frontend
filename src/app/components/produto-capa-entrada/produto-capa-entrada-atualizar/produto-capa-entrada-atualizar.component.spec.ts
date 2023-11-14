import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaEntradaAtualizarComponent } from './produto-capa-entrada-atualizar.component';

describe('ProdutoCapaEntradaAtualizarComponent', () => {
  let component: ProdutoCapaEntradaAtualizarComponent;
  let fixture: ComponentFixture<ProdutoCapaEntradaAtualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaEntradaAtualizarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaEntradaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
