import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelInputComponent } from './label-input.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LabelInputComponent', () => {
  let component: LabelInputComponent;
  let fixture: ComponentFixture<LabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelInputComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelInputComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl('', Validators.required);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la etiqueta correcta', () => {
    component.label = 'Nombre';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelElement.textContent).toBe('Nombre');
    expect(labelElement.getAttribute('for')).toBe('Nombre');
  });

  it('el input debería tener el tipo, id y placeholder correctos', () => {
    component.type = 'text';
    component.label = 'Nombre';
    component.placeholder = 'Ingrese su nombre';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.type).toBe('text');
    expect(inputElement.id).toBe('Nombre');
    expect(inputElement.placeholder).toBe('Ingrese su nombre');
  });

  it('debería vincular el FormControl al input correctamente', () => {
    component.formControl.setValue('Test Name');
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputElement.value).toBe('Test Name');
  });

  it('debería mostrar mensaje de error cuando el control es inválido y está tocado', () => {
    component.label = 'Nombre';
    component.formControl.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-messages div'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe('Nombre es requerido.');
  });

  it('no debería mostrar mensaje de error cuando el control es válido', () => {
    component.label = 'Nombre';
    component.formControl.setValue('Valid Name');
    component.formControl.markAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error-messages'));
    expect(errorElement).toBeNull();
  });

  it('debería mostrar mensaje de error de maxlength cuando se excede la longitud', () => {
    component.label = 'Descripción';
    component.placeholder = 'Ingrese una descripción';
    component.maxlength = 90;
  
    component.formControl = new FormControl('', [Validators.required, Validators.maxLength(90)]);
    
    component.formControl.setValue('a'.repeat(91));
    component.formControl.markAsTouched();
    
    fixture.detectChanges();
  
    const errorElements = fixture.debugElement.queryAll(By.css('.error-messages div'));
  
    const maxlengthErrorElement = errorElements.find(el => el.nativeElement.textContent.includes('no puede exceder 90 caracteres.'));
  
    expect(maxlengthErrorElement).toBeTruthy();
  
    expect(maxlengthErrorElement!.nativeElement.textContent.trim()).toBe('Descripción no puede exceder 90 caracteres.');
  });
});
