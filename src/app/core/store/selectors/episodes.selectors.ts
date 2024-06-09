import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EpisodeState } from '../reducers/episodes.reducer';

export const selectEpisodeState = createFeatureSelector<EpisodeState>('episodes');

export const selectEpisodes = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.episodes
);

export const selectEpisodeLoading = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.loading
);

export const selectEpisodeError = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.error
);

export const selectSelectedEpisode = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.selectedEpisode
);

export const selectEpisodesPages = createSelector(
  selectEpisodeState,
  (state: EpisodeState) => state.info!
);
