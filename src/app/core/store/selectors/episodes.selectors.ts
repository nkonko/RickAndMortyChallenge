import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodeState } from '../reducers/episodes.reducer';
import { Episode } from '../../models/episode.interface';

export const selectEpisodeState = createFeatureSelector<EpisodeState>('episodes');

export const selectEpisodes = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.episodes
);

export const selectEpisodeById = (episodeId: number) => createSelector(
  selectEpisodes,
  (characters: Episode[]) => characters.find(episode => episode.id === episodeId)
);

export const selectSelectedEpisode = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.selectedEpisode
);

export const selectEpisodesPages = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.info!
);
