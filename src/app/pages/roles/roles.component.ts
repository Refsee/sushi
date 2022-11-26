import { Component, OnInit } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interfaces/goods/goods.interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
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
  constructor(private goodsService: GoodsService) {}

  ngOnInit(): void {
    this.allGoods();
  }
  allGoods(): void {
    this.goodsService.getAll().subscribe((data) => (this.goods = data));
  }
}
