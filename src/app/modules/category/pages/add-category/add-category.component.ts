import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/interfaces/formField.model';
import { CategoryService } from '../../../../shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  nameLength : number = 50;
  descriptionLength : number = 90;

  fields: FormField[] = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Category name',
      validators: [Validators.required, Validators.maxLength(this.nameLength)],
      errorMessages: {
        required: 'Name is requeried.',
        maxlength: 'Name lenght can not exced ' + this.nameLength + ' characters.'
      }
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      placeholder: 'Category description',
      validators: [Validators.required, Validators.maxLength(this.descriptionLength)],
      errorMessages: {
        required: 'Description is requeried.',
        maxlength: 'Description lenght can not exced ' + this.descriptionLength + ' characters.'
      }
    }
  ];

  message?: { type: 'success' | 'error'; text: string };
  constructor(private categoryService: CategoryService) {}

  onSubmit(value: any): void {
    this.categoryService.createCategory(value).subscribe({
      next: (res) => {
        this.message = { type: 'success', text: 'Category created succesfully.' };
      },
      error: (err) => {
        this.message = { type: 'error', text: err || 'An error has ocurred.' };
      }
    });
  }
  
}