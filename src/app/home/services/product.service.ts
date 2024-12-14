import { computed, Injectable, signal } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products=signal<Product[]>([]);
  private _selectedproduct=signal<Product | null>(null);

  constructor() {
       console.log("_products",this._products);
   }
  
  // products=computed(()=>this._products());
  selectedproduct=computed(()=>this._selectedproduct());

  get products(){
    return this._products.asReadonly();
  }

  AddProduct(product:Product):void{
        this._products.update((products)=>[...products, product]);
     }

     UpdateProduct(updateproduct:Product):void{
      this._products.update((products)=>
      products.map((product)=>
      product.id === updateproduct.id ? updateproduct : product));
   }
   DeleteProduct(productid:number):void{
    this._products.update((products)=>
    products.filter((product)=>product.id !== productid));
   }
   SelectProduct(productid:number):void{
    const product=this._products().find((p)=>p.id === productid) || null;
    this._selectedproduct.set(product);
   }

   ClearSelection():void{
    this._selectedproduct.set(null);
   }
}
