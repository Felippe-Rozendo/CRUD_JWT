import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = `${environment.baseUrl}Authentication`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router : Router) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Usuario criado com sucesso!', 'X', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarError() {
    this._snackBar.open('Usuario duplicado!', 'X', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  login(model: any) {
    return this.http.post(`${this.URL}/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(`${this.URL}/Register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    
    if(this.jwtHelper.isTokenExpired(token)){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
     
    }
    
    return !this.jwtHelper.isTokenExpired(token);
  }


}
