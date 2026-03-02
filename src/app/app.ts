import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ],
  template: '<router-outlet/>',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
}
