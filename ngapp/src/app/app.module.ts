import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaceholderComponent } from './crud/placeholder/placeholder.component';
import { CarBrandComponent } from './crud/car-brand/car-brand.component';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './crud/car/car.component';
import { DeliveryComponent } from './crud/delivery/delivery.component';

const appRoutes: Routes = [
  { path: '', component: PlaceholderComponent },
  { path: 'car-brand', component: CarBrandComponent},
  { path: 'car', component: CarComponent},
  { path: 'delivery', component: DeliveryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent,
    CarBrandComponent,
    CarComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
