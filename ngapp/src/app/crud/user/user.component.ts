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
    let newUser = this.collectAllDataAboutUser(row);
    if (newUser.role == "User") {
      this.dataService.postUser(newUser);
    } else {
      this.dataService.postUserAdmin(newUser);
    }
    this.cleanCreateRow(row);
  }

  collectAllDataAboutUser(row): UserModel {
    let user = new UserModel();
    user.username = this.getElementFromInputByFieldName("username", row);
    user.forename = this.getElementFromInputByFieldName("forename", row);
    user.surname = this.getElementFromInputByFieldName("surname", row);
    user.password = this.getElementFromInputByFieldName("password", row);
    user.role = this.getElementFromRoleInput(row);
    return user;
  }

  getElementFromInputByFieldName(name, row) {
    return row.getElementsByClassName("input-" + name)[0].value;
  }

  getElementFromRoleInput(row) {
    let inputRoles = row.getElementsByClassName("input-role");
    let inputRole;
    if (inputRoles[0].style.display != "none") {
      inputRole = inputRoles[0];
    } else {
      inputRole = inputRoles[1];
    }
    return inputRole.value;
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
    let restrictedItems = document.getElementsByClassName("restricted");
    for (let i = 0; i < restrictedItems.length; i++) {
      let item = restrictedItems.item(i) as HTMLElement;
      if (!item.classList.contains("level-" + permissionLevel)) {
        item.style.display = "none";
      }
    }
  }

}
