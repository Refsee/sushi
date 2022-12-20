import { Component, OnInit, HostListener } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  public totalPrice = 0;
  public totalCount = 0;
  public basket: IGoodsResponse[] = [];

  public isOpenBusket = false;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  showBusket(): void {
    this.isOpenBusket = !this.isOpenBusket;
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce(
      (total: number, product: IGoodsResponse) =>
        total + product.count * product.price,
      0
    );
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce(
      (total: number, product: IGoodsResponse) => total + product.count,
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

  @HostListener('click', ['$event'])
  hostClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('window:click')
  hide(): void {
    this.isOpenBusket = false;
  }
}
