import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeProdutivaAddEditComponent } from './unidade-produtiva-add-edit.component';

describe('UnidadeProdutivaAddEditComponent', () => {
  let component: UnidadeProdutivaAddEditComponent;
  let fixture: ComponentFixture<UnidadeProdutivaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadeProdutivaAddEditComponent]
    });
    fixture = TestBed.createComponent(UnidadeProdutivaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
