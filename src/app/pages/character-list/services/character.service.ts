import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiCharacter } from '../../../core/models/api-character.interface';
import { Character } from '../../../core/models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  ApiURL: string = `${environment.API_URL}/character`;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<ApiCharacter> {
    return this.http.get<ApiCharacter>(this.ApiURL);
  }

  getCharactersByPage(pageUrl: string): Observable<ApiCharacter> {
    return this.http.get<ApiCharacter>(pageUrl);
  }

  getCharactersById(characterId: number): Observable<Character> {
    const characterUrl = `${this.ApiURL}/${characterId}`;
    return this.http.get<Character>(characterUrl);
  }
}
