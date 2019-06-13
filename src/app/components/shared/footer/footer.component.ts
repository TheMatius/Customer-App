import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public author: any = { name: 'Matius', lastname: 'Monsalve' }; //Por defecto es public
}
