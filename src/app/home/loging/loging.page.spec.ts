import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogingPage } from './loging.page';

describe('LogingPage', () => {
  let component: LogingPage;
  let fixture: ComponentFixture<LogingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
