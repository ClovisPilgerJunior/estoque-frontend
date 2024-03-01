import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemCompraAddEditComponent } from './ordem-compra-add-edit.component';

describe('OrdemCompraAddEditComponent', () => {
  let component: OrdemCompraAddEditComponent;
  let fixture: ComponentFixture<OrdemCompraAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdemCompraAddEditComponent]
    });
    fixture = TestBed.createComponent(OrdemCompraAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
