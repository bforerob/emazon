import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryComponent } from './add-category.component';
import { CategoryService } from '../../../../shared/services/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryServiceMock: any;

  beforeEach(async () => {
    // Mock del CategoryService
    categoryServiceMock = {
      createCategory: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Para evitar errores con componentes hijos (ej. <app-form>)
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form fields correctly', () => {
    expect(component.fields.length).toBe(2); // Tiene 2 campos: name y description
    expect(component.fields[0].name).toBe('name');
    expect(component.fields[1].name).toBe('description');
  });

  it('should call categoryService.createCategory on form submission with valid data', () => {
    const mockFormValue = {
      name: 'Test Category',
      description: 'Test Description'
    };

    categoryServiceMock.createCategory.mockReturnValue(of({}));
    component.onSubmit(mockFormValue);

    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith(mockFormValue);
    expect(component.message?.type).toBe('success');
    expect(component.message?.text).toBe('Category created succesfully.');
  });

  it('should handle error when categoryService.createCategory fails', () => {
    const mockFormValue = {
      name: 'Test Category',
      description: 'Test Description'
    };

    categoryServiceMock.createCategory.mockReturnValue(throwError(() => 'Error'));
    component.onSubmit(mockFormValue);

    expect(categoryServiceMock.createCategory).toHaveBeenCalledWith(mockFormValue);
    expect(component.message?.type).toBe('error');
    expect(component.message?.text).toBe('Error');
  });

});
