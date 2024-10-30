import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Group {
  id: number;
  name: string;
  description: string;
  trainer: string;
  members: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [];
  private groupsSubject = new BehaviorSubject<Group[]>([]);
  groups$ = this.groupsSubject.asObservable();

  createGroup(group: Omit<Group, 'id' | 'members'>): void {
    const newGroup: Group = {
      ...group,
      id: Date.now(),
      members: []
    };
    this.groups.push(newGroup);
    this.groupsSubject.next(this.groups);
  }

  subscribeToGroup(groupId: number, athleteEmail: string): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.members.includes(athleteEmail)) {
      group.members.push(athleteEmail);
      this.groupsSubject.next(this.groups);
    }
  }

  getGroups(): Group[] {
    return this.groups;
  }
}