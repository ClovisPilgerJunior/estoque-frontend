import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaAtualizarComponent } from './produto-capa-atualizar.component';

describe('ProdutoCapaAtualizarComponent', () => {
  let component: ProdutoCapaAtualizarComponent;
  let fixture: ComponentFixture<ProdutoCapaAtualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaAtualizarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
