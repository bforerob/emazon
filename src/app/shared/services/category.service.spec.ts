import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../interfaces/category.model';
import { environment } from '../../../environments/environment.mock';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const dummyCategory: Category = {
    id: 1,
    name: 'Electronics',
    description: 'Various electronic products'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category successfully', () => {
    service.createCategory(dummyCategory).subscribe((response) => {
      expect(response).toEqual(dummyCategory);
    });

    const req = httpMock.expectOne(environment.addCategoryUrl);
    expect(req.request.method).toBe('POST');
    req.flush(dummyCategory); // Simula una respuesta exitosa con el `dummyCategory`
  });

  it('should handle network error (client-side error)', () => {
    const errorMessage = 'Error: Network error';
    const mockError = new ErrorEvent('Network error');

    service.createCategory(dummyCategory).subscribe({
      next: () => fail('Should have failed with a client-side error'),
      error: (error) => {
        expect(error).toEqual('Error: Network error');
      }
    });

    const req = httpMock.expectOne(environment.addCategoryUrl);
    req.error(mockError); // Simula un error del lado del cliente (como un problema de red)
  });

  it('should handle server-side error (status 0)', () => {
    const mockErrorResponse = { status: 0, statusText: 'Unknown Error' };

    service.createCategory(dummyCategory).subscribe({
      next: () => fail('Should have failed with server-side error'),
      error: (error) => {
        expect(error).toBe('Ups... we are having server issues :(');
      }
    });

    const req = httpMock.expectOne(environment.addCategoryUrl);
    req.flush(null, mockErrorResponse); // Simula un error del servidor con status 0
  });

  it('should handle backend error with message', () => {
    const errorMessage = 'Category already exists';
    const mockErrorResponse = { status: 409, statusText: 'Conflict' };
    const mockErrorBody = { message: errorMessage };

    service.createCategory(dummyCategory).subscribe({
      next: () => fail('Should have failed with a 409 error'),
      error: (error) => {
        expect(error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(environment.addCategoryUrl);
    req.flush(mockErrorBody, mockErrorResponse); // Simula un error de conflicto del backend con un mensaje personalizado
  });

  it('should handle backend error without message', () => {
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };

    service.createCategory(dummyCategory).subscribe({
      next: () => fail('Should have failed with a 500 error'),
      error: (error) => {
        expect(error).toBe('An unknown error occurred!');
      }
    });

    const req = httpMock.expectOne(environment.addCategoryUrl);
    req.flush(null, mockErrorResponse); // Simula un error 500 sin un mensaje específico
  });
});
