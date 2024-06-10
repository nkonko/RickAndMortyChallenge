import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Episode } from '../../../core/models/episode.interface';
import { ApiEpisode } from '../../../core/models/api-episode.interface';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private ApiURL: string = `${environment.API_URL}/episode`;

  constructor(private http: HttpClient) {}

  getEpisodes(): Observable<ApiEpisode> {
    return this.http.get<ApiEpisode>(this.ApiURL);
  }

  getEpisodesByPage(pageUrl: string): Observable<ApiEpisode> {
    return this.http.get<ApiEpisode>(pageUrl);
  }

  getEpisodeById(episodeId: number): Observable<Episode> {
    const episodeUrl = `${this.ApiURL}/${episodeId}`;
    return this.http.get<Episode>(episodeUrl);
  }
}
