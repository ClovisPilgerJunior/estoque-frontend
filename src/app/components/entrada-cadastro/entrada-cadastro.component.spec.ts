import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaCadastroComponent } from './entrada-cadastro.component';

describe('EntradaCadastroComponent', () => {
  let component: EntradaCadastroComponent;
  let fixture: ComponentFixture<EntradaCadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaCadastroComponent]
    });
    fixture = TestBed.createComponent(EntradaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
