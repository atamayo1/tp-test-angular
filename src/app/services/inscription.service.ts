import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  constructor(public http: HttpClient) {}

  httpWithOutToken(
    url: string,
    type: 'get' | 'post' | 'patch' | 'delete',
    parameters?: { [x: string]: string },
    body?: any
  ): Observable<any> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    if (!_.isUndefined(parameters)) {
      for (const key in parameters) {
        if (typeof parameters[key] === 'object') {
          for (let i = 0; i < parameters[key].length; i++) {
            params = params.append(key, parameters[key][i]);
          }
        } else {
          params = params.append(key, parameters[key]);
        }
      }
    }
    switch (type) {
      case 'get':
        return this.http.get(url, { params: params });
      case 'post':
        return this.http.post(url, body, { params: params });
      case 'patch':
        return this.http.patch(url, body, { params: params });
      case 'delete':
        return this.http.delete(url, { params: params });
    }
  }
}
