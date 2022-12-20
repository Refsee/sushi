import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IGoodsResponse } from '../interfaces/goods/goods.interface';
import { GoodsService } from '../services/goods/goods.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IGoodsResponse> {
  constructor( private goodsSrvice: GoodsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGoodsResponse> {
    return this.goodsSrvice.getOne(+route.params['id'])
  }
}
