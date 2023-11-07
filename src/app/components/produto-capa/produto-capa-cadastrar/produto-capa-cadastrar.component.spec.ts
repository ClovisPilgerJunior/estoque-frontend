import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaCadastrarComponent } from './produto-capa-cadastrar.component';

describe('ProdutoCapaCadastrarComponent', () => {
  let component: ProdutoCapaCadastrarComponent;
  let fixture: ComponentFixture<ProdutoCapaCadastrarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaCadastrarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
