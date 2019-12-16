import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      user => {
        if (user) {
          this.router.navigate(['main']);
        }
      }
    )
  }

  onLogin() {
    let usernameInput:any = document.getElementById("login-input-login");
    let passwordInput:any = document.getElementById("login-input-password");
    this.authenticationService.login(usernameInput.value, passwordInput.value);

  }

}
