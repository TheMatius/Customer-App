import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { DirectiveComponent } from './components/directive/directive.component';
import { CustomerFormComponent } from './components/customers/customer-form.component';

const APP_ROUTES: Routes = [
    { path: 'customers', component: CustomersComponent },
    { path: 'customers/form', component: CustomerFormComponent },
    { path: 'customers/form/:id', component: CustomerFormComponent },
    { path: 'directives', component: DirectiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'customers' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);