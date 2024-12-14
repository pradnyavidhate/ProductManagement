import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [ CommonModule,IonicModule],
})
export class ProductComponent  implements OnInit {
  products=this.productstate.products;

  constructor(private productstate:ProductService) { }

  ngOnInit() {}

}
