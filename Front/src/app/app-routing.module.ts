import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { CreateProductComponent } from './Components/createProduct/createProduct.component';
import { HomeComponent } from './Components/Home/Home.component';
import { ProductsComponent } from './Components/products/products.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductsComponent  },
  {path: 'create', component: CreateProductComponent },
  {path: 'sobre', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
