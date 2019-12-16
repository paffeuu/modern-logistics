import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { DataService } from 'src/app/service/data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewChecked {

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService
  ) { }

  users: UserModel[];

  ngOnInit() {
    this.dataService.getUsersObservable().subscribe(users => {
      this.users = users;
    });

    this.dataService.getUsers();
  }

  ngAfterViewChecked() {
    this.checkPermissionLevel();
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let newEmployee = this.collectAllDataAboutUser(row);
    // if which type of user
    // this.dataService.postUser(newEmployee);
    this.cleanCreateRow(row);
  }

  collectAllDataAboutUser(row): UserModel {
    let user = new UserModel();
    user.username = this.getElementFromInputByFieldName("username", row);
    user.forename = this.getElementFromInputByFieldName("forename", row);
    user.surname = this.getElementFromInputByFieldName("surname", row);
    user.password = this.getElementFromInputByFieldName("password", row);
    // collect role
    return user;
  }

  getElementFromInputByFieldName(name, row) {
    return row.getElementsByClassName("input-" + name)[0].value;
  }

  findRow(event) {
    return event.path[4];
  }

  cleanCreateRow(row) {
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).value = "";  
    }
  }

  checkPermissionLevel() {
    let permissionLevel = this.authenticationService.getUserRole();
    let restrictedItems = document.getElementsByClassName("level-3");
    for (let i = 0; i < restrictedItems.length; i++) {
      let item = restrictedItems.item(i) as HTMLElement;
      if (!item.classList.contains("level-" + permissionLevel)) {
        item.style.display = "none";
      }
    }
  }

}
