import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  role: 'trainer' | 'athlete';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string): void {
    // Simulamos lógica de rol basada en el email
    const role = email.includes('trainer') ? 'trainer' : 'athlete';
    const user: User = { email, role };
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}