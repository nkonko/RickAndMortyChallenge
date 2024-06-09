import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EpisodeService } from '../../../pages/episode-list/episode.service';
import {
  loadEpisodeDetail,
  loadEpisodeDetailFailure,
  loadEpisodeDetailSuccess,
  loadEpisodes,
  loadEpisodesFailure,
  loadEpisodesPage,
  loadEpisodesPageFailure,
  loadEpisodesPageSuccess,
  loadEpisodesSuccess,
} from '../actions/episodes/episodes.action';
import { ApiEpisode } from '../../models/api-episode.interface';
import { Episode } from '../../models/episode.interface';

@Injectable()
export class EpisodeEffects {
  constructor(
    private actions$: Actions,
    private episodeService: EpisodeService
  ) {}

  loadEpisodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodes),
      switchMap(() =>
        this.episodeService.getEpisodes().pipe(
          map((episodes) => {
            const modified = this.splitEpisode(episodes);
            return loadEpisodesSuccess({ data: modified });
          }),
          catchError((error) => of(loadEpisodesFailure({ error })))
        )
      )
    )
  );

  loadPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodesPage),
      switchMap((res) =>
        this.episodeService.getEpisodesByPage(res.pageUrl).pipe(
          map((data) => {
            const modified = this.splitEpisode(data);
            return loadEpisodesPageSuccess({ data: modified });
          }),
          catchError((error) => of(loadEpisodesPageFailure({ error })))
        )
      )
    )
  );

  loadEpisodeDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEpisodeDetail),
      switchMap(({ episodeId }) =>
        this.episodeService.getEpisodeById(episodeId).pipe(
          map((episode) => {
            const modified = this.setCharacterIds(episode);
            return loadEpisodeDetailSuccess({ episode: modified });
          }),
          catchError((error) => of(loadEpisodeDetailFailure({ error })))
        )
      )
    )
  );

  splitEpisode(data: ApiEpisode) {
    return {
      ...data,
      results: data.results.map((episode: Episode) => {
        const partialEpisode = this.setCharacterIds(episode);
        const [season, number] = partialEpisode.episode.split('E');

        const completeEpisode: Episode = {
          ...partialEpisode,
          season: season,
          number: number,
        };

        return completeEpisode;
      }),
    };
  }

  setCharacterIds(episode: Episode) {
    return {
      ...episode,
      charactersIds: episode.characters.map((url) => {
        const lastSlashIndex = url.lastIndexOf('/');
        const id = url.substring(lastSlashIndex + 1);
        return id;
      }),
    };
  }
}
