import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  listProducts: Product[] = [
    {id: 1, name: 'coca cola', description: 'Bebida azucar', price: 4, stock: 200},
    {id: 2, name: 'bintang', description: 'cerveza', price: 6, stock: 95},
  ];
}
