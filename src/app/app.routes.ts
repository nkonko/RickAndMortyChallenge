import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'', redirectTo: 'home', pathMatch:'full'
  },
  {
    path: 'home',
    loadComponent: () =>
            import('./pages/home/home.component')
            .then(m => m.HomeComponent)
  },
  {
    path: 'characters',
    loadComponent: () =>
            import('./pages/character-list/components/character-list.component')
            .then(m => m.CharacterListComponent)
  },
  {
    path: 'character/:id',
    loadComponent: () =>
            import('./pages/character-detail/character-detail.component')
            .then(m => m.CharacterDetailComponent)
  },
  {
    path: 'episodes',
    loadComponent: () =>
            import('./pages/episode-list/components/episode-list.component')
            .then(m => m.EpisodeListComponent)
  },
  {
    path: 'episode/:id',
    loadComponent: () =>
            import('./pages/character-detail/character-detail.component')
            .then(m => m.CharacterDetailComponent)
  },
  // { path: '**', redirectTo: 'not-found'}
];
