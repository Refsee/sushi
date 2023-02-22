import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public formOrder!: FormGroup;

  public basket: IGoodsResponse[] = [];

  public totalPrice = 0;
  
  constructor(private basketService: BasketService,
    private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initOrderForm()
  }

  
  initOrderForm(): void {
    this.formOrder = this.fb.group({

      payStatus: ['cash', Validators.required],
      delivery: ['del', Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
      street: [null, Validators.required],
      number: [null, Validators.required],
      entrance: [null],
      apartment: [null],
    });
  }



  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce(
      (total: number, product: IGoodsResponse) =>
        total + product.count * product.price,
      0
    );
  }

  updateBasket(): void {
    this.basketService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  productCount(product: IGoodsResponse, sign: boolean): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
    this.basketService.updateCountBasket(product);
  }

  deleteProduct(product: IGoodsResponse): void {
    this.basketService.deleteProdBasket(product);
  }

}
