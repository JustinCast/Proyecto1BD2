import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConnectionComponent } from './login-connection.component';

describe('LoginConnectionComponent', () => {
  let component: LoginConnectionComponent;
  let fixture: ComponentFixture<LoginConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
