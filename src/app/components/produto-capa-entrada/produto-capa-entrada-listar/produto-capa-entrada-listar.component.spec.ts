import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaEntradaListarComponent } from './produto-capa-entrada-listar.component';

describe('ProdutoCapaEntradaListarComponent', () => {
  let component: ProdutoCapaEntradaListarComponent;
  let fixture: ComponentFixture<ProdutoCapaEntradaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaEntradaListarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaEntradaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
