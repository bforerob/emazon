// src/app/pages/add-category/add-category.component.ts

import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
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

  constructor(private categoryService: CategoryService) {}

  onSubmit(value: any): void {
    this.categoryService.createCategory(value).subscribe({
      next: (res) => {
        // Manejar respuesta exitosa
        console.log('Categoría creada:', res);
      },
      error: (err) => {
        // Manejar errores
        console.error('Error al crear categoría:', err);
      }
    });
  }
}
