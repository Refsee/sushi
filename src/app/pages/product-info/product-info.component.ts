import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public product!: IGoodsResponse;

  constructor(
    private basketService: BasketService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data=>{this.product = data['productInfo']})
  }

  productCount(product: IGoodsResponse, sign: boolean): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
  }

  addToBusket(product: IGoodsResponse): void {
    this.basketService.addToBusket(product)
    product.count = 1;
  }

}
