// src/app/pages/add-category/add-category.component.ts

import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Category } from 'src/app/shared/interfaces/category.model';
import { FormField } from 'src/app/shared/interfaces/formField.model';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  fields: FormField[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Category name',
      placeholder: 'name',
      validators: [Validators.required, Validators.maxLength(50)],
      errorMessages: {
        required: 'name is requeried.',
        maxlength: 'name lenght cant exced 50 characters'
      }
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      placeholder: 'Ingresa la descripción',
      validators: [Validators.required, Validators.maxLength(90)],
      errorMessages: {
        required: 'La descripción es obligatoria.',
        maxlength: 'La descripción no puede exceder los 90 caracteres.'
      }
    }
  ];

  message?: { type: 'success' | 'error'; text: string };
  constructor(private categoryService: CategoryService) {}

  onSubmit(value: any): void {
    this.categoryService.createCategory(value).subscribe({
      next: (res) => {
        // Manejar respuesta exitosa
        this.message = { type: 'success', text: 'Categoría creada exitosamente.' };
        console.log('Categoría creada:', res);
      },
      error: (err) => {
        // Manejar errores de forma segura
        this.message = { type: 'error', text: err || 'Error al crear asasaasla categoría.' };
        console.error('Error al crear categoría:', err);
      }
    });
  }
  
}
/*
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = this.categoryForm.value;
      this.categoryService.createCategory(newCategory).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.submissionSuccess = 'Categoría creada exitosamente.';
          this.submissionError = '';
          this.categoryForm.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.submissionError = error;
          this.submissionSuccess = '';
        }
      });
      console.log('Formulario enviado:', this.categoryForm.value);
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
*/