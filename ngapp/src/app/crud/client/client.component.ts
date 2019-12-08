import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getClientsObservable().subscribe(clients => {
      clients.forEach(client => {
        this.clients = [];
        client.deliveriesIds = client.deliveries.map(delivery => delivery.id).join(", ");
        this.clients.push(client);
      })
    })

    this.dataService.getClients();
  }

  onDeleteItem(event) {
    let id = event.path[2].getElementsByClassName("id-column")[0].innerHTML;
    this.dataService.deleteClient(id);
  }

}
