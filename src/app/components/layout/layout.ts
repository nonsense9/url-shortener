import { Component } from '@angular/core';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    Header,
    RouterOutlet
  ],
  template: `
    <app-header/>
    <router-outlet/>`,
  standalone: true
})
export class Layout {
}
