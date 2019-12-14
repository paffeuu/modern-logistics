import { Component } from '@angular/core';
import { DataService } from './service/data.service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modern-logistics';

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit() {
    document.body.classList.add("body-background");
  }

  onLogoutClick() {
    this.authenticationService.logout();
  }
}
