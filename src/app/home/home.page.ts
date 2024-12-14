import { Component, computed, signal, effect, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import{ Product } from '../model/product.model';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductComponent } from './product/product.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ CommonModule,IonicModule,FormsModule,ReactiveFormsModule,RouterLink],
})
export class HomePage {
  productForm:FormGroup;
  updateForm:boolean =false;
  currentProduct:Product | null=null;
 selectedCatogory:string='';


  products=this.productstate.products;
  
  constructor( private productstate:ProductService,private formBuilder:FormBuilder) {
   this.productForm=this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(2)]],
    price:['',[Validators.required,Validators.min(0)]],
    category:['',[Validators.required,Validators.minLength(3)]],
    inStock:[true]
   })
  }
  
  addProduct(){
    console.log("form values",this.productForm.value);
    if(this.productForm.valid){
      console.log("form value",this.productForm.value);
      const newProduct:Product={
        id:Date.now(),
        ...this.productForm.value
      };
      this.productstate.AddProduct(newProduct);
      this.productForm.reset({inStock: true});

    }else{
      console.error('Invalid form');
    }
  }
  populateUpdateForm(product:Product){
    this.currentProduct=product;
    this.productForm.patchValue(product);
    this.updateForm=true;
  }

  updateProduct(){
    if(this.productForm.valid && this.currentProduct){
      const updateproduct:Product={
        id:this.currentProduct.id,
        ...this.productForm.value,
      }
      this.productstate.UpdateProduct(updateproduct);
      this.currentProduct=null;
      this.productForm.reset({inStock:true});
    }
      }
  cancelUpdate(){
    this.updateForm=false;
    this.currentProduct={id:0,name:'',category:'',price:0,inStock:true};
  }

  deleteProduct(id:number){
    this.productstate.DeleteProduct(id);
  }

  onSelect(id:number){
    this.productstate.SelectProduct(id);
  }
// getCategory():string[]{
//   return Array.from(new Set(this.products().map((product)=>product.category)));
// }
 
}
