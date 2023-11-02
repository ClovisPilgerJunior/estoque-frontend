import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorCadastroComponent } from './fornecedor-cadastrar.component';

describe('FornecedorCadastroComponent', () => {
  let component: FornecedorCadastroComponent;
  let fixture: ComponentFixture<FornecedorCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorCadastroComponent]
    });
    fixture = TestBed.createComponent(FornecedorCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
