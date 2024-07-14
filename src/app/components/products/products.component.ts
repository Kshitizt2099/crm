import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  even:boolean=false;
items = [
    { name: 'Product 1', desc: 'Description of Product 1', price: 100 },
    { name: 'Product 2', desc: 'Description of Product 2', price: 200 }
  ];
  enter()
  {
    this.even=!this.even;
  }
}
