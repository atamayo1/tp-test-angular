import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Inscription } from '../models/inscription';
import {
  AppHttpResponse,
  TrackHttpError,
} from '../interfaces/response.interface';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  decrypRSA: any;
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Inscription[]> {
    var url = `/assets/mocks/companies.json`;
    return this.http.get<AppHttpResponse<Inscription[]>>(url).pipe(
      map((response: AppHttpResponse<Inscription[]>) => {
        if (response.hasErrors) {
          return [];
        } else {
          return response.body;
        }
      }),
      catchError(() => {
        return of([]);
      })
    );
  }
  
  getCompanyById(id: number): Observable<Inscription> {
    var url = `/assets/mocks/companies.json`;
    return this.http.get<Inscription>(url + "/" + id);
  }

  saveCompany(
    data: Inscription
  ): Observable<AppHttpResponse<any> | TrackHttpError> {
    var url = `/assets/mocks/companies.json`;
    return this.http
      .post<null>(url, data)
      .pipe(catchError((error) => this.handleHttpError(error)));
  }

  private handleHttpError(
    error: HttpErrorResponse
  ): Observable<TrackHttpError> {
    console.log('ERROR => ', error);
    let dataError = new TrackHttpError();
    dataError.inscriptionErrorMessage =
      'Se presentó un error.. Intente nuevamente.';
    return throwError(dataError);
  }
}
