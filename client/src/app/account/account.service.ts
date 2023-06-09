import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../shared/models/user';
import { UserGameroomsAndSheetsService } from '../user-gamerooms-and-sheets/user-gamerooms-and-sheets.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private router: Router) {}
  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', { headers: headers }).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: User) => {
        localStorage.setItem('token', user.token);
        this.currentUserSource.next(user);
      })
    );
  }
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }
  getCurrentUser() {
    return this.currentUserSource.getValue();
  }
  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }
}
