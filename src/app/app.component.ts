import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="text-align: center; margin-top: 20px;">
      <h1>Hello, {{ title }}</h1>
    </div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'User admin';
}

