import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/service/data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, AfterViewChecked {

  clients: Client[] = [];

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getClientsObservable().subscribe(clients => {
      this.clients = clients;
      this.clients.forEach(client => {
        client.deliveriesIds = client.deliveries.map(delivery => delivery.id).join(", ");
      })
    })

    this.dataService.getClients();
  }

  ngAfterViewChecked() {
    this.checkPermissionLevel();
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let client = this.collectAllDataAboutClient(row);
    this.dataService.postClient(client);
    this.cleanCreateRow(row);
  }

  onEditItem(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).style.display = "block";
    }
    let button = row.getElementsByTagName("button");
    button.item(0).style.display = "block";
  }

  onDeleteItem(event) {
    let id = this.findRowId(event);
    this.dataService.deleteClient(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let client = this.collectAllDataAboutClient(row);
    client.id = id;
    this.dataService.putClient(id, client);
  }

  collectAllDataAboutClient(row): Client {
    let client = new Client();
    client.name = this.getElementFromInputByFieldName("name", row);
    client.address = this.getElementFromInputByFieldName("address", row);
    return client;
  }

  getElementFromInputByFieldName(name, row) {
    return row.getElementsByClassName("input-" + name)[0].value;
  }
  
  findRowId(event) {
    return event.path[4].getElementsByClassName("id-column")[0].children[0].textContent;
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
