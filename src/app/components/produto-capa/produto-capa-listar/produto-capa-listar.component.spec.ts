import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaListarComponent } from './produto-capa-listar.component';

describe('ProdutoCapaListarComponent', () => {
  let component: ProdutoCapaListarComponent;
  let fixture: ComponentFixture<ProdutoCapaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaListarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
