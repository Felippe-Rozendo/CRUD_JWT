import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { AuthGuard } from './Components/auth/auth.guard';
import { CreateProductComponent } from './Components/createProduct/createProduct.component';
import { HomeComponent } from './Components/Home/Home.component';
import { ProductsComponent } from './Components/products/products.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegisterComponent } from './Components/user/register/register.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'product', component: ProductsComponent, canActivate:[AuthGuard] },
  { path: 'create', component: CreateProductComponent, canActivate:[AuthGuard] },
  { path: 'sobre', component: AboutComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
