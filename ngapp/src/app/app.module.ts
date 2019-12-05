import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaceholderComponent } from './service/crud/placeholder/placeholder.component';

const appRoutes: Routes = [
  { path: '', component: PlaceholderComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
