import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ProgressBarComponent],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false
  id: number;
  operacion: string = 'Agregar '

  constructor(private fb: FormBuilder, 
    private productService: ProductService, 
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })
    // aRouter.snapshot.paramMap.get('id')
    this.id = Number(aRouter.snapshot.paramMap.get('id'))

  }

  ngOnInit(): void {
    if (this.id != 0) {
      //Es editar
      this.operacion = 'Editar '
      this.getProduct(this.id);
    }
  }


  getProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe((data:Product) => {
      console.log(data)
      this.loading = false
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }


  addProduct() {
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    this.loading = true;
    this.productService.saveProduct(product).subscribe(() => {
      console.log('Producto agregado con éxito')
      this.loading = false
      this.toastr.success(`El producto ${product.name} fue registrado con éxito`, 'producto registrado')
      this.router.navigate(['/'])
    })
  }

}
