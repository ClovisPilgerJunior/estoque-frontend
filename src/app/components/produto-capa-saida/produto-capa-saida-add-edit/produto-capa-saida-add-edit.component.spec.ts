import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaSaidaAddEditComponent } from './produto-capa-saida-add-edit.component';

describe('ProdutoCapaSaidaAddEditComponent', () => {
  let component: ProdutoCapaSaidaAddEditComponent;
  let fixture: ComponentFixture<ProdutoCapaSaidaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaSaidaAddEditComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaSaidaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
