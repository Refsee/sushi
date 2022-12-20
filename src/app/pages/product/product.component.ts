import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { BasketService } from 'src/app/shared/services/basket.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  public goods: IGoodsResponse[] = [];
  public filterCategories: string[] = [
    'Всі',
    'Філадельфія',
    'Каліфорнія',
    'Запечені',
    'Фірмові',
    'Преміум',
    'Макі',
  ];
  public categoryName!: string;
  public obj: any = {
    roles: 'Роли',
    sets: 'Сети',
    drink: 'Напої',
    sauces: 'Соуси',
  };

  private eventSubscription!: Subscription;

  constructor(
    private goodsService: GoodsService,
    private basketService: BasketService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadGoods();
      }
    });
  }

  ngOnInit(): void {}

  loadGoods(): void {
    const category = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    const categoryName = category ? category : 'roles';
    this.categoryName = this.obj[categoryName];
    this.goodsService.getAllByCategory(categoryName).subscribe((data) => {
      this.goods = data;
    });
  }

  productCount(product: IGoodsResponse, sign: boolean): void {
    if (sign) {
      ++product.count;
    } else if (!sign && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IGoodsResponse): void {
    this.basketService.addToBusket(product);
    product.count = 1;
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
