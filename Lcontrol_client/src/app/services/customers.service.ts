import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private baseUrl = 'http://localhost:3000/customers';

  constructor(private http: HttpClient) {}

  searchCustomers(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v) httpParams = httpParams.set(k, v as string);
    });
    return this.http.get(`${this.baseUrl}/search`, { params: httpParams });
  }
}
