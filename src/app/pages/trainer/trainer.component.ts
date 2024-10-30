import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../services/group.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Panel de Entrenador</h2>
      
      <div class="card">
        <h3>Crear Nuevo Grupo</h3>
        <div class="form-group">
          <input
            type="text"
            [(ngModel)]="newGroup.name"
            class="form-control"
            placeholder="Nombre del grupo"
          >
        </div>
        <div class="form-group">
          <textarea
            [(ngModel)]="newGroup.description"
            class="form-control"
            placeholder="Descripción del grupo"
          ></textarea>
        </div>
        <button (click)="createGroup()" class="btn btn-primary">Crear Grupo</button>
      </div>

      <div class="groups-list">
        <h3>Mis Grupos</h3>
        <div *ngFor="let group of groups$ | async" class="card">
          <h4>{{ group.name }}</h4>
          <p>{{ group.description }}</p>
          <p>Miembros: {{ group.members.length }}</p>
        </div>
      </div>
    </div>
  `
})
export class TrainerComponent {
  newGroup = {
    name: '',
    description: ''
  };
  groups$ = this.groupService.groups$;

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  createGroup(): void {
    const user = this.authService.getCurrentUser();
    if (user && this.newGroup.name && this.newGroup.description) {
      this.groupService.createGroup({
        name: this.newGroup.name,
        description: this.newGroup.description,
        trainer: user.email
      });
      this.newGroup = { name: '', description: '' };
    }
  }
}