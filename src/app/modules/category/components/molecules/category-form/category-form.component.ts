import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  submissionError: string = '';
  submissionSuccess: string = '';
  isLoading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService 
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(90)]]
    });
  }

  get name(): FormControl {
    return this.categoryForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.categoryForm.get('description') as FormControl;
  }

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
}
