import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/auth/user';
import { HttpClient } from '@angular/common/http';
import { environment, authEndpoints } from 'src/environments/environment';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(
    private http: HttpClient, 
    private router: Router) 
  {
    let currentUser:any = localStorage.getItem('currentUser');
    if (currentUser) {
      this.logged = true;
      this.currentUserToken = JSON.parse(currentUser).token;
    }
    this.currentUser = new BehaviorSubject(JSON.parse(currentUser));
  }

  currentUser: BehaviorSubject<User>;
  currentUserToken: string;
  logged: boolean;

  login(username, password) {
    let body = {
      username: username,
      password: password
    }
    this.http.post(environment.hostName + environment.authPath + authEndpoints.login, body).subscribe(
      (resp:any) => {
        let currentUser = new User(resp.username, resp.token);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUser.next(currentUser);
        this.currentUserToken = currentUser.token;
        this.logged = true;
      }
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    this.logged = false;
    this.currentUserToken = null;
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
