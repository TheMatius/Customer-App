import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../classes/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint: string = 'http://localhost:8080/api/customers';
  private headers: HttpHeaders =  new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    /*
      return of(CUSTOMERS); // Se convierte y se crea el flujo Observable a partir del objeto CUSTOMERS.
      <Customer[]>(this.urlEndPoint) es un cast, los datos que recibe del url los convierte al tipo de este.
      También es posible importar map desde rxjs/operators y quedaría así:
      return this.http.get(this.urlEndPoint).pipe(map(response => response as Customers[));
     */
    return this.http.get<Customer[]>(this.urlEndPoint);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${ this.urlEndPoint }/${ id }`);
  }

  newCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.urlEndPoint, customer, { headers: this.headers });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${ this.urlEndPoint }/${ customer.id }`, customer, { headers: this.headers });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${ this.urlEndPoint }/${ id }`, { headers: this.headers });
  }
 }
