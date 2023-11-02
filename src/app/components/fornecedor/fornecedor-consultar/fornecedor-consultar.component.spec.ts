import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorConsultaComponent } from './fornecedor-consultar.component';

describe('FornecedorConsultaComponent', () => {
  let component: FornecedorConsultaComponent;
  let fixture: ComponentFixture<FornecedorConsultaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorConsultaComponent]
    });
    fixture = TestBed.createComponent(FornecedorConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
