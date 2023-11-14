import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaEntradaCadastrarComponent } from './produto-capa-entrada-cadastrar.component';

describe('ProdutoCapaEntradaCadastrarComponent', () => {
  let component: ProdutoCapaEntradaCadastrarComponent;
  let fixture: ComponentFixture<ProdutoCapaEntradaCadastrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaEntradaCadastrarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaEntradaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
