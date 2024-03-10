import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  public baseUrl: string = 'assets/data';

  constructor(private http: HttpClient) { }

  /*
    ** Method to get all available operators
  */
  getOperators(): Observable<any> {
    const url = `${this.baseUrl}/operators.json`;
    return this.http.get<any>(url);
  }

  /*
    ** Method to get all available type of values
  */
  getTypeValues(): Observable<any> {
    const url = `${this.baseUrl}/type-values.json`;
    return this.http.get<any>(url);
  }
}
