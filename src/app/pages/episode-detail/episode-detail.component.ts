import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Episode } from '../../core/models/episode.interface';
import { LocationStrategy } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadEpisodeDetail } from '../../core/store/actions/episodes/episodes.action';
import { selectSelectedEpisode } from '../../core/store/selectors/episodes.selectors';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonMaterialModule, RouterLink],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.scss',
})
export class EpisodeDetailComponent implements OnInit, OnDestroy {
  episode$!: Observable<Episode | null>;
  unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute, private location: LocationStrategy){}

  ngOnInit(): void {
    this.episode$ = this.route.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(params => {
        const id = Number(params.get('id'));
        this.store.dispatch(loadEpisodeDetail({ episodeId: id }));
        return this.store.select(selectSelectedEpisode);
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  back() {
    this.location.back();
  }
}
