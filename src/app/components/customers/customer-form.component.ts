import { Component, OnInit } from '@angular/core';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styles: []
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = new Customer();
  createCustomer: boolean = true;

  constructor(private _customer: CustomerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCustomer();
  }

  public create(): void {
    this._customer.newCustomer(this.customer)
      .subscribe(customer => {
        console.log(customer);
        swal.fire(
          'New customer',
          `Customer ${ customer.name } created!`,
          'success');
        this.router.navigate(['/customers']);
      });
  }

  public update(): void {
    this._customer.updateCustomer(this.customer)
      .subscribe(customer => {
        swal.fire(
          'Update customer',
         `Customer ${ customer.name } updated!`,
         'success');
        this.router.navigate(['/customers']);
      });
  }

  public loadCustomer(): void {
    this.route.params.subscribe(res => {
      const id = res.id;

      if (id) {
      this._customer.getCustomer(id)
        .subscribe(customer => this.customer = customer);
      }
    });
  }
}
