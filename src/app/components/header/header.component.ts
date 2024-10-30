import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div *ngIf="authService.currentUser$ | async as user">
        <span>{{ user.email }}</span>
        <button class="btn btn-primary" (click)="logout()">Cerrar Sesión</button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}