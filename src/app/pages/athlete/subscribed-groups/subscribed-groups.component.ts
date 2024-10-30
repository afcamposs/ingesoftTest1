import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../../services/group.service';
import { AuthService } from '../../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subscribed-groups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="groups-list">
      <h3>Mis Grupos</h3>
      <div *ngFor="let group of subscribedGroups$ | async" class="card">
        <h4>{{ group.name }}</h4>
        <p>{{ group.description }}</p>
        <p>Entrenador: {{ group.trainer }}</p>
        <p>Total de miembros: {{ group.members.length }}</p>
      </div>

      <div *ngIf="(subscribedGroups$ | async)?.length === 0" class="empty-state">
        No estás suscrito a ningún grupo todavía
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
export class SubscribedGroupsComponent {
  currentUser = this.authService.getCurrentUser();
  subscribedGroups$ = this.groupService.groups$.pipe(
    map(groups => groups.filter(group => 
      group.members.includes(this.currentUser?.email || '')
    ))
  );

  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {}
}