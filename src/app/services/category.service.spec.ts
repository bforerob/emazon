// src/app/services/category.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from './../models/category.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockCategory: Category = {
    id: 1,
    name: 'Electronics',
    description: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#createCategory', () => {
    it('should create a category and return it', () => {
      service.createCategory(mockCategory).subscribe((response) => {
        expect(response).toEqual(mockCategory);
      });

      const req = httpMock.expectOne(service['apiUrl']);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      expect(req.request.body).toEqual(mockCategory);

      req.flush(mockCategory);
    });

    it('should handle a client-side error', () => {
      const errorEvent = new ErrorEvent('Network error', {
        message: 'No Internet',
      });

      service.createCategory(mockCategory).subscribe(
        () => fail('should have failed with a client-side error'),
        (error) => {
          expect(error).toBe('Error: No Internet');
        }
      );

      const req = httpMock.expectOne(service['apiUrl']);
      req.error(errorEvent);
    });

    it('should handle a server-side error with a custom message', () => {
      const errorMessage = 'Category already exists';

      service.createCategory(mockCategory).subscribe(
        () => fail('should have failed with a server-side error'),
        (error) => {
          expect(error).toBe(errorMessage);
        }
      );

      const req = httpMock.expectOne(service['apiUrl']);
      req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
    });

    it('should handle a server-side error without a custom message', () => {
      const status = 500;
      const statusText = 'Internal Server Error';

      service.createCategory(mockCategory).subscribe(
        () => fail('should have failed with a server-side error'),
        (error) => {
          expect(error).toBe(`Error Code: ${status}\nMessage: ${statusText}`);
        }
      );

      const req = httpMock.expectOne(service['apiUrl']);
      req.flush({}, { status, statusText });
    });
  });
});
