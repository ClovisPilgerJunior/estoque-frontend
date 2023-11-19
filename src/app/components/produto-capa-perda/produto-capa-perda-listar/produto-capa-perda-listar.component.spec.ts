import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaPerdaListarComponent } from './produto-capa-perda-listar.component';

describe('ProdutoCapaPerdaListarComponent', () => {
  let component: ProdutoCapaPerdaListarComponent;
  let fixture: ComponentFixture<ProdutoCapaPerdaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaPerdaListarComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaPerdaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
