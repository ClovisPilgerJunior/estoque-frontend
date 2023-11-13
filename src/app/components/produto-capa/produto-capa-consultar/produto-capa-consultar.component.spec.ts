import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaConsultarComponent } from './produto-capa-consultar.component';

describe('ProdutoCapaConsultarComponent', () => {
  let component: ProdutoCapaConsultarComponent;
  let fixture: ComponentFixture<ProdutoCapaConsultarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaConsultarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
