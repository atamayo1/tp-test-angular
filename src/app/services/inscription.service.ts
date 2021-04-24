import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  getHealthScoreHistorical(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>('/assets/mocks/companies.json');
  }
}
