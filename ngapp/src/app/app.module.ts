import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaceholderComponent } from './crud/placeholder/placeholder.component';
import { CarBrandComponent } from './crud/car-brand/car-brand.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarComponent } from './crud/car/car.component';
import { DeliveryComponent } from './crud/delivery/delivery.component';
import { ClientComponent } from './crud/client/client.component';
import { EmployeeComponent } from './crud/employee/employee.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthenticationService } from './service/authentication.service';
import { AuthenticationInterceptor } from './service/authentication-interceptor';
import { UserComponent } from './crud/user/user.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'main', component: PlaceholderComponent, canActivate: [AuthenticationService] },
  { path: 'car-brand', component: CarBrandComponent, canActivate: [AuthenticationService]},
  { path: 'car', component: CarComponent, canActivate: [AuthenticationService]},
  { path: 'delivery', component: DeliveryComponent, canActivate: [AuthenticationService]},
  { path: 'client', component: ClientComponent, canActivate: [AuthenticationService]},
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthenticationService]},
  { path: 'user', component: UserComponent, canActivate: [AuthenticationService]}
];

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent,
    CarBrandComponent,
    CarComponent,
    DeliveryComponent,
    ClientComponent,
    EmployeeComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
