import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-athlete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2>Panel de Deportista</h2>
      
      <nav class="nav-tabs">
        <a routerLink="available" routerLinkActive="active" class="tab">Grupos Disponibles</a>
        <a routerLink="subscribed" routerLinkActive="active" class="tab">Mis Grupos</a>
      </nav>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .nav-tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 2px solid #ddd;
    }
    .tab {
      padding: 10px 20px;
      text-decoration: none;
      color: #666;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
    }
    .tab.active {
      color: #007bff;
      border-bottom: 2px solid #007bff;
    }
    .content {
      padding-top: 20px;
    }
  `]
})
export class AthleteComponent {}