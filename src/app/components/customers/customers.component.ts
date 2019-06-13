import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customers.service';
import { Customer } from '../../classes/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customers: Customer[];
  isLoading: boolean = true;

  constructor(private _customers: CustomerService) { }

  ngOnInit() {
    this._customers.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        this.isLoading = false;
      });
  }

  delete(customer: Customer): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want delete the customer ${ customer.name } ${ customer.lastname }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._customers.deleteCustomer(customer.id)
          .subscribe(() => {
            this.customers = this.customers.filter(cus => cus !== customer);
            Swal.fire(
              'Deleted!',
              `The customer ${ customer.name } were deleted!`,
              'success');
          });
      }
    });
  }

}
