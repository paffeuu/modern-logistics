import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CarBrand } from '../../model/car-brand';
import { DataService } from 'src/app/service/data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit, AfterViewChecked {

  carBrands: CarBrand[] = [];

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getCarBrandsObservable().subscribe((carBrands) => {
      this.carBrands = [];
      carBrands.forEach(carBrand => this.carBrands.push(carBrand));
    })

    this.dataService.getCarBrands();
  }

  ngAfterViewChecked() {
    this.checkPermissionLevel();
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let newCarBrand = this.collectAllDataAboutCarBrandOnCreate(row);
    this.dataService.postCarBrand(newCarBrand);
    this.cleanCreateRow(row);
  }

  onEditItem(event) {
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
    this.dataService.deleteCarBrand(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let carBrand = this.collectAllDataAboutCarBrand(row);
    carBrand.id = id;
    this.dataService.putCarBrand(id, carBrand);
  }

  collectAllDataAboutCarBrand(row): CarBrand {
    let carBrand = new CarBrand();
    carBrand.name = this.getElementFromInputByFieldName("name", row);
    return carBrand;
  }

  collectAllDataAboutCarBrandOnCreate(row): CarBrand {
    let carBrand = new CarBrand();
    carBrand.name = this.getElementFromInputByFieldName("name", row);
    return carBrand;
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
    let restrictedItems = document.getElementsByClassName("restricted");
    for (let i = 0; i < restrictedItems.length; i++) {
      let item = restrictedItems.item(i) as HTMLElement;
      if (!item.classList.contains("level-" + permissionLevel)) {
        item.style.display = "none";
      }
    }
  }
}
