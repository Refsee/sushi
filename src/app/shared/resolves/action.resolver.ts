import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IActionResponse } from '../interfaces/action/action.interface';
import { ActionService } from '../services/action/action.service';

@Injectable({
  providedIn: 'root'
})
export class ActionResolver implements Resolve<IActionResponse> {
constructor (private actionServise:ActionService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IActionResponse> {
    return this.actionServise.getOne(+route.params['id'])
  }
}
