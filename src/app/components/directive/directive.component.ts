import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent {

  strList: string[] = ['Typescript', 'Javascript', 'Java SE', 'C#', 'Python'];
  enableButton: boolean = true;
  constructor() { }

  setEnable(): void {
    this.enableButton = this.enableButton ? false : true;
  }
}
