import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCapaPerdaAddEditComponent } from './produto-capa-perda-add-edit.component';

describe('ProdutoCapaPerdaAddEditComponent', () => {
  let component: ProdutoCapaPerdaAddEditComponent;
  let fixture: ComponentFixture<ProdutoCapaPerdaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoCapaPerdaAddEditComponent]
    });
    fixture = TestBed.createComponent(ProdutoCapaPerdaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
