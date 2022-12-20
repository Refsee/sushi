import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IGoodsResponse } from '../interfaces/goods/goods.interface';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  public changeBasket = new Subject<boolean>();

  constructor() {}

  addToBusket(product: IGoodsResponse): void {
    let basket: IGoodsResponse[] = [];
    if (localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((item) => item.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.changeBasket.next(true);
  }

  updateCountBasket(product: IGoodsResponse): void {
    let basket: IGoodsResponse[] = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (basket.some((item) => item.id === product.id)) {
      const index = basket.findIndex((prod) => prod.id === product.id);
      basket[index] = product;
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.changeBasket.next(true);
  }

  deleteProdBasket(product: IGoodsResponse): void {
    let basket: IGoodsResponse[] = [];
    if (localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      basket = basket.filter((item) => item.id !== product.id);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.changeBasket.next(true);
  }
}
