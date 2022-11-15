import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionRequest, IActionResponse } from '../../interfaces/action/action.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IActionResponse[]> {
    return this.http.get<IActionResponse[]>(this.api.actions);
  }

  getOne(id: number): Observable<IActionResponse> {
    return this.http.get<IActionResponse>(`${this.api.actions}/${id}`);
  }

  create(action: IActionRequest): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(this.api.actions, action);
  }

  update(action: IActionRequest, id: number): Observable<IActionResponse> {
    return this.http.patch<IActionResponse>(`${this.api.actions}/${id}`, action);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }

}
