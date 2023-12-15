import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListarComponent } from './user-listar.component';

describe('UserListarComponent', () => {
  let component: UserListarComponent;
  let fixture: ComponentFixture<UserListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListarComponent]
    });
    fixture = TestBed.createComponent(UserListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
