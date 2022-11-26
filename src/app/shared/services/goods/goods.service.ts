import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IGoodsRequest, IGoodsResponse } from '../../interfaces/goods/goods.interface';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  private url = environment.BACKEND_URL;
  private api = { goods: `${this.url}/goods` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IGoodsResponse[]> {
    return this.http.get<IGoodsResponse[]>(this.api.goods);
  }

  create(category: IGoodsRequest): Observable<IGoodsResponse> {
    return this.http.post<IGoodsResponse>(this.api.goods, category);
  }

  update(article: IGoodsRequest, id: number): Observable <IGoodsResponse> {
    return this.http.patch<IGoodsResponse>(`${this.api.goods}/${id}`, article);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.goods}/${id}`);
}
}