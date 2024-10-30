import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../services/group.service';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-available-groups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="groups-list">
      <h3>Grupos Disponibles</h3>
      <div *ngFor="let group of availableGroups$ | async" class="card">
        <h4>{{ group.name }}</h4>
        <p>{{ group.description }}</p>
        <p>Entrenador: {{ group.trainer }}</p>
        <button
          (click)="subscribeToGroup(group.id)"
          class="btn btn-primary"
        >
          Suscribirse
        </button>
      </div>
      
      <div *ngIf="(availableGroups$ | async)?.length === 0" class="empty-state">
        No hay grupos disponibles en este momento
      </div>
    </div>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `]
})
export class AvailableGroupsComponent {
  currentUser = this.authService.getCurrentUser();
  availableGroups$ = this.groupService.groups$.pipe(
    map(groups => groups.filter(group => 
      !group.members.includes(this.currentUser?.email || '')
    ))
  );

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  subscribeToGroup(groupId: number): void {
    if (this.currentUser) {
      this.groupService.subscribeToGroup(groupId, this.currentUser.email);
    }
  }
}