import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeProdutivaListarComponent } from './unidade-produtiva-listar.component';

describe('UnidadeProdutivaListarComponent', () => {
  let component: UnidadeProdutivaListarComponent;
  let fixture: ComponentFixture<UnidadeProdutivaListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeProdutivaListarComponent]
    });
    fixture = TestBed.createComponent(UnidadeProdutivaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
