import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorAtualizarComponent } from './fornecedor-atualizar.component';

describe('FornecedorAtualizarComponent', () => {
  let component: FornecedorAtualizarComponent;
  let fixture: ComponentFixture<FornecedorAtualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorAtualizarComponent]
    });
    fixture = TestBed.createComponent(FornecedorAtualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
