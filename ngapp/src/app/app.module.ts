import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaceholderComponent } from './crud/placeholder/placeholder.component';
import { ProductComponent } from './crud/product/product.component';

const appRoutes: Routes = [
  { path: '', component: PlaceholderComponent },
  { path: 'product', component: ProductComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
