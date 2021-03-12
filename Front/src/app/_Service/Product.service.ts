import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product_model } from '../_model/Product_model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this._snackBar.open('Produto criado com sucesso', 'X', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBar2() {
    this._snackBar.open('Produto alterado com sucesso', 'X', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  URL = `${environment.baseUrl}`

  gelAll(): Observable<Product_model[]>{
    return this.http.get<Product_model[]>(`${this.URL}Product`);
  }

  update(model: Product_model){
    return this.http.put(`${this.URL}Product/update/${model.id}`, model);
  }

  delete(id: number){
    return this.http.delete(`${this.URL}Product/${id}`)
  }

  post(model: Product_model){
    return this.http.post(`${this.URL}Product/Register`, model)
  }

}
