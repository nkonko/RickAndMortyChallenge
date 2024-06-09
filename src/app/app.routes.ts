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
            import('./pages/episode-detail/episode-detail.component')
            .then(m => m.EpisodeDetailComponent)
  },
  {
    path: 'web-socket',
    loadComponent: () =>
            import('./pages/web-socket-view/components/web-socket-view.component')
            .then(m => m.WebSocketViewComponent)
  },
  {
    path: 'not-found',
    loadComponent: () =>
            import('./pages/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
  },
  { path: '**', redirectTo: 'not-found'}
];
