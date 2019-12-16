import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/auth/user';
import { HttpClient } from '@angular/common/http';
import { environment, authEndpoints } from 'src/environments/environment';
import { Router, CanActivate } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private notificationService: NotificationService) 
  {
    let currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      this.logged = true;
    }
    this.currentUserValue = JSON.parse(currentUserString) as User;
    this.currentUser = new BehaviorSubject(this.currentUserValue);
  }

  currentUser: BehaviorSubject<User>;
  currentUserValue: User;
  logged: boolean;

  login(username, password) {
    let body = {
      username: username,
      password: password
    }
    this.http.post(environment.hostName + environment.authPath + authEndpoints.login, body).subscribe(
      (resp:any) => {
        let currentUser = new User(resp.username, resp.token, resp.role);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUser.next(currentUser);
        this.currentUserValue = currentUser;
        this.logged = true;
      },
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this.logged = false;
    this.currentUserValue = null;
  }

  getUserRole() {
    return this.currentUserValue.role;
  }

  canActivate() {
    if (this.logged) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
