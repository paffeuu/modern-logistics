import { Component } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modern-logistics';

  private dataService: DataService;

  constructor(dataService: DataService){
    this.dataService = dataService;
  }

  ngOnInit() {
    document.body.classList.add("body-background");
  }
}
