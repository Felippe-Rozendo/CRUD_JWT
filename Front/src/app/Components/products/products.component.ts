import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product_model } from 'src/app/_model/Product_model';
import { ProductService } from 'src/app/_Service/Product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.allProducts();
    this.formulario = this.fb.group({
      id:['', Validators.required],
      marca: ['', Validators.required],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['', Validators.required]
    })
  }

  public prod: Product_model[];
  public produto: Product_model;
  public title = 'Produtos'
  public modalRef: BsModalRef;
  public idSelect;
  @ViewChild('msg') msg;
  @ViewChild('template') template;
  public formulario: FormGroup;

  allProducts() {
    this.service.gelAll().subscribe(
      (prods: Product_model[]) => { this.prod = prods },
      (error: any) => { console.error(error) }
    );
  }

  //EXCLUINDO UM PRODUTO
  confirmMsg(prod) {
    this.idSelect = prod;
    this.modalRef = this.modalService.show(this.msg, { class: 'modal-sm' });
  }

  accept() {
    this.service.delete(this.idSelect.id).subscribe(
      () => {
        this.allProducts();
        this.modalRef.hide();
      },
      (error: any) => { console.error(error) }
    )
  }

  //EDITANDO PRODUTO
  openModal(model: Product_model) {
    this.modalRef = this.modalService.show(this.template, { class: 'modal-sm' });
    this.produto = model;
    this.formulario.patchValue(model);
  };

  productSubmit() {
    this.salvar(this.formulario.value);
  }

  salvar(model: Product_model) {
    this.service.update(model).subscribe(
      () => {
        console.log(model);
        this.modalRef.hide();
        this.service.openSnackBar2();
        this.allProducts();
      },
      (error: any) => { console.error(error) }
    );
  }

}
