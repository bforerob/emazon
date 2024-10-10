import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  get nombre(): FormControl {
    return this.categoryForm.get('nombre') as FormControl;
  }

  get descripcion(): FormControl {
    return this.categoryForm.get('descripcion') as FormControl;
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      console.log('Formulario enviado:', this.categoryForm.value);
      // Aquí puedes agregar la lógica para manejar el envío del formulario más adelante
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
