import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor(private http: HttpClient) { }

  getOperators(): Observable<any> {
    return this.http.get<any>('assets/data/operators.json');
  }
}
