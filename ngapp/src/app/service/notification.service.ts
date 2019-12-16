import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  parseErrorMessage(err) {
    alert(`Wystąpił błąd serwera (problem z połączeniem lub wpisano złe dane): \n\n${err.status}: ${err.statusText}`);
  }
}
