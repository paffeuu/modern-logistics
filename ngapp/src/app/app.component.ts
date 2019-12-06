import { Component } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modern-logistics';

  constructor(){}

  ngOnInit() {
    document.body.classList.add("body-background");
  }
}
