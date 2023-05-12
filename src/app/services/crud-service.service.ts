import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { IPostParams } from '../interfaces/post-params.interface';
import { IGetParams } from '../interfaces/get_params.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  private url: string = 'http://localhost:3333/posts';

  constructor(private http: HttpClient) { }

  public post(obj: IPostParams): Observable<IResponse> {
    return this.http.post<IResponse>(this.url,obj).pipe(take(1));
  }

  public get(): Observable<IGetParams> {
    return this.http.get<IGetParams>(this.url).pipe(take(1));
  }

  public delete(id: string): Observable<IResponse> {
    const deleteUrl: string = `${this.url}/${id}`;
    return this.http.delete<IResponse>(deleteUrl).pipe(take(1));
  }

  public patch(id: string, obj: IPostParams): Observable<IPostParams> {
    const patchUrl: string = `${this.url}/${id}`;
    return this.http.patch<IPostParams>(patchUrl,obj).pipe(take(1))
  }
}
