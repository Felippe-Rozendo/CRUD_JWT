import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product_model } from 'src/app/_model/Product_model';
import { ProductService } from 'src/app/_Service/Product.service';

@Component({
  selector: 'app-createProduct',
  templateUrl: './createProduct.component.html',
  styleUrls: ['./createProduct.component.css']
})
export class CreateProductComponent implements OnInit {

  public formulario : FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router: Router   
  ) { }
  
  ngOnInit() {
    this.formulario = this.fb.group({
      marca: ['', Validators.required],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  }

  productSubmit(){
    this.salvar(this.formulario.value);    
  }

  salvar(model: Product_model){
    this.service.post(model).subscribe(
      () => {
        console.log(model);
        this.service.openSnackBar();
        this.router.navigate(['/product'])
      },
      (error: any) => {console.error(error)}
    );
  }
  
  cancelar(){
    this.formulario.reset();
  }

}
