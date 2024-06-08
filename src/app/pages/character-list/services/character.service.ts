import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiData } from '../../../core/models/api-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  ApiURL: string = `${environment.API_URL}/character`;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<ApiData> {
    return this.http.get<ApiData>(this.ApiURL);
  }

  getCharactersByPage(pageUrl: string): Observable<ApiData> {
    return this.http.get<ApiData>(pageUrl);
  }
}
