// src/app/atoms/button/button.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el texto correcto en el botón', () => {
    component.text = 'Enviar';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent).toBe('Enviar');
  });

  it('debería tener el tipo correcto', () => {
    component.type = 'submit';
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.type).toBe('submit');
  });

  it('debería estar deshabilitado cuando la propiedad "disabled" es true', () => {
    component.disabled = true;
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBeTruthy();
  });

  it('debería emitir el evento "onClick" cuando se hace clic y no está deshabilitado', () => {
    jest.spyOn(component.onClick, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('no debería emitir el evento "onClick" cuando está deshabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
    jest.spyOn(component.onClick, 'emit');

    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);

    expect(component.onClick.emit).not.toHaveBeenCalled();
  });
});
