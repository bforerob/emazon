// src/app/shared/components/form/form.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

// Mock de app-label-input con ControlValueAccessor
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  template: '<input [type]="type" [placeholder]="placeholder" (input)="onInput($event)" (blur)="onBlur()" [value]="value" [disabled]="disabled" />',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockLabelInputComponent),
      multi: true
    }
  ]
})
class MockLabelInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  
  value: string = '';
  disabled: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }
}

// Mock de app-button
@Component({
  selector: 'app-button',
  template: '<button [disabled]="disabled">{{ text }}</button>'
})
class MockButtonComponent {
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() text: string = 'Button';
}

// Mock de app-message
@Component({
  selector: 'app-message',
  template: '<div [ngClass]="type">{{ text }}</div>'
})
class MockMessageComponent {
  @Input() type: 'success' | 'error' = 'error';
  @Input() text: string = 'An error has occurred';
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Category Name',
      placeholder: 'Enter category name',
      validators: [Validators.required, Validators.maxLength(50)],
      errorMessages: {
        required: 'Category name is required.',
        maxlength: 'Category name cannot exceed 50 characters.'
      }
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description',
      validators: [Validators.required, Validators.maxLength(90)],
      errorMessages: {
        required: 'Description is required.',
        maxlength: 'Description cannot exceed 90 characters.'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        MockLabelInputComponent,
        MockButtonComponent,
        MockMessageComponent
      ],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.fields = mockFields;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Add New Category';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toBe('Add New Category');
  });

  it('should initialize the form with provided fields', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should make the description control required', () => {
    const control = component.form.get('description');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    expect(control?.errors?.['required']).toBeTruthy();
  });

  it('should emit submitForm with form value when form is valid', () => {
    const submitSpy = jest.spyOn(component.submitForm, 'emit');

    component.form.get('name')?.setValue('Electronics');
    component.form.get('description')?.setValue('Various electronic products');
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    expect(submitSpy).toHaveBeenCalledWith({
      name: 'Electronics',
      description: 'Various electronic products'
    });
  });

  it('should not emit submitForm when form is invalid and mark all as touched', () => {
    const submitSpy = jest.spyOn(component.submitForm, 'emit');
    const markAllAsTouchedSpy = jest.spyOn(component.form, 'markAllAsTouched');

    component.form.get('name')?.setValue('');
    component.form.get('description')?.setValue('');
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    expect(submitSpy).not.toHaveBeenCalled();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should display error messages when form controls are invalid and touched', () => {
    const nameControl = component.form.get('name');
    nameControl?.setValue('');
    nameControl?.markAsTouched();

    fixture.detectChanges();

    const errorElements = fixture.debugElement.queryAll(By.css('.error span'));
    expect(errorElements.length).toBe(1);
    expect(errorElements[0].nativeElement.textContent.trim()).toBe('Category name is required.');
  });

  it('should display the success message when message input is provided', () => {
    component.message = { type: 'success', text: 'Category created successfully.' };
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('app-message')).nativeElement;
    expect(messageElement.textContent).toBe('Category created successfully.');
    //expect(messageElement.classList).toContain('success');
  });

  it('should display the error message when message input is provided', () => {
    component.message = { type: 'error', text: 'Failed to create category.' };
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('app-message')).nativeElement;
    expect(messageElement.textContent).toBe('Failed to create category.');
    //expect(messageElement.classList).toContain('error');
  });
});
