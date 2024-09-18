import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe } from '@angular/common';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  listProducts: Product[] = [];
  loading: boolean = false


  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts() {   
    this.loading = true;

    this.productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data
      this.loading = false
    })
    
  }

  deleteProduct(id: number){
    this.loading = true
    this.productService.deleteProduct(id).subscribe(data => {
      console.log(data)
      this.getListProducts()
      this.toastr.warning('El producto fue eliminado con éxito', 'Producto eliminado')
    })
  }

}
