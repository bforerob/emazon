import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../interfaces/category.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.addCategoryUrl;

  constructor(private http: HttpClient) { }

  createCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Category>(this.apiUrl, category, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else{
      if (error.status === 0) {
        errorMessage = 'Ups... we are having server issues :(';
      }
      else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    } 
    return throwError(errorMessage);
    
  }
}
