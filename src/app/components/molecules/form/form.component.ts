import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/interfaces/formField.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() message?: { type: 'success' | 'error'; text: string };
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const formGroup: any = {};

    this.fields.forEach(field => {
      formGroup[field.name] = [
        field.value || '',
        field.validators || []
      ];
    });
    this.form = this.fb.group(formGroup);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  getErrorKeys(controlName: string): string[] {
    const control = this.form.get(controlName);
    return control && control.errors ? Object.keys(control.errors) : [];
  }

  defaultErrorMessage(errorKey: string, label: string): string {
    const messages: { [key: string]: string } = {
      required: `${label} es requerido.`,
      maxlength: `${label} excede el número máximo de caracteres.`,
      // Agrega más mensajes según tus validadores
    };
    return messages[errorKey] || `${label} es inválido.`;
  }
}