import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Iniciar Sesión</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          [(ngModel)]="email"
          class="form-control"
          placeholder="ejemplo@correo.com"
        >
        <small>Usa 'trainer' en el email para acceder como entrenador</small>
      </div>
      <button (click)="login()" class="btn btn-primary">Iniciar Sesión</button>
    </div>
  `
})
export class LoginComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (this.email) {
      this.authService.login(this.email);
      const user = this.authService.getCurrentUser();
      if (user?.role === 'trainer') {
        this.router.navigate(['/trainer']);
      } else {
        this.router.navigate(['/athlete']);
      }
    }
  }
}