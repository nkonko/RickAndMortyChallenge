import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../../../core/models/character.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  ApiURL: string = `${environment.API_URL}/character`;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.ApiURL);
  }
}
