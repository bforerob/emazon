// src/app/atoms/label-input/label-input.component.ts

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LabelInputComponent),
      multi: true
    }
  ]
})
export class LabelInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() maxlength!: number;

  // ControlValueAccessor callbacks
  onChange: any = () => {};
  onTouched: any = () => {};

  // Internal value
  value: any;
formControl: any;

  // Función para escribir un valor en el componente
  writeValue(value: any): void {
    this.value = value;
  }

  // Registrar una función para cuando el valor cambia
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registrar una función para cuando el control es tocado
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Si el componente es deshabilitado
  setDisabledState?(isDisabled: boolean): void {
    // Implementa esta función si deseas manejar el estado deshabilitado
  }

  // Manejar el cambio en el input
  handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  // Manejar el evento de blur
  handleBlur(): void {
    this.onTouched();
  }
}
