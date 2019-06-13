import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Customer } from '../classes/customer';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlEndPoint: string = 'http://localhost:8080/api/customers';
  private headers: HttpHeaders =  new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
              private router: Router) { }

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
    return this.http.get<Customer>(`${ this.urlEndPoint }/${ id }`)
      .pipe(catchError(err => {
        this.router.navigate(['/customers']);
        Swal.fire(
          'Error trying to update',
          err.error.message,
          'error');
        return throwError(err);
      }));
  }

  // Al manejar el pipe del map, no es necesario realizar el cast del tipo de dato a retornar.
  newCustomer(customer: Customer): Observable<Customer> {
    return this.http.post(this.urlEndPoint, customer, { headers: this.headers })
      .pipe(catchError(err => {
        Swal.fire(
          'Error trying to create',
          err.error.error,
          'error');
        return throwError(err);
      }), map(res => res['customer']));
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put(`${ this.urlEndPoint }/${ customer.id }`, customer, { headers: this.headers })
    .pipe(catchError(err => {
      this.router.navigate(['/customers']);
      Swal.fire(
        'Error trying to update',
        err.error.error,
        'error');
      return throwError(err);
    }), map(res => res['customer']));
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${ this.urlEndPoint }/${ id }`, { headers: this.headers })
    .pipe(catchError(err => {
      this.router.navigate(['/customers']);
      Swal.fire(
        'Error trying to delete',
        err.error.error,
        'error');
      return throwError(err);
    }));
  }
 }
