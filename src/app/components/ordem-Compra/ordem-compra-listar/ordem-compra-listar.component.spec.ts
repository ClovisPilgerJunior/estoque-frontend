import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemCompraListarComponent } from './ordem-compra-listar.component';

describe('OrdemCompraListarComponent', () => {
  let component: OrdemCompraListarComponent;
  let fixture: ComponentFixture<OrdemCompraListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdemCompraListarComponent]
    });
    fixture = TestBed.createComponent(OrdemCompraListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
