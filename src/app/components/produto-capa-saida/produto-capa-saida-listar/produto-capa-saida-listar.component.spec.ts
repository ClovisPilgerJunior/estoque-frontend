import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaSaidaListarComponent } from './produto-capa-saida-listar.component';

describe('ProdutoCapaSaidaListarComponent', () => {
  let component: ProdutoCapaSaidaListarComponent;
  let fixture: ComponentFixture<ProdutoCapaSaidaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaSaidaListarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaSaidaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
