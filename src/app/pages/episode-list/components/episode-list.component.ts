import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Episode } from '../../../core/models/episode.interface';
import { Observable, Subject, Subscription, filter, fromEvent, takeUntil, throttleTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadEpisodes, loadEpisodesPage } from '../../../core/store/actions/episodes/episodes.action';
import { selectEpisodes, selectEpisodesPages } from '../../../core/store/selectors/episodes.selectors';
import { CommonMaterialModule } from '../../../core/modules/material/common-material.module';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { Info } from '../../../core/models/info.interface';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  imports: [CommonMaterialModule, CustomTableComponent],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss'
})
export class EpisodeListComponent implements OnInit, AfterViewInit, OnDestroy{
  dataSource = new MatTableDataSource<Episode>();
  episodes$: Observable<Episode[]>;
  episodes!: Episode[];
  pageInfo$: Observable<Info>;
  info!: Info;

  displayedColumns: string[] = [
    'link',
    'season',
    'number',
    'name',
    'air_date',
  ];
  unsuscribe$ = new Subject<void>();
  scrollSubscription: Subscription | undefined;

  @ViewChild('bottomAnchor', { static: true }) bottomAnchor!: ElementRef;

  constructor(private store: Store) {
    this.episodes$ = this.store.select(selectEpisodes);
    this.pageInfo$ = this.store.select(selectEpisodesPages);
  }

  ngOnInit(): void {
     this.store.dispatch(loadEpisodes());

     this.episodes$.pipe(takeUntil(this.unsuscribe$)).subscribe(episodes => {
      this.dataSource = new MatTableDataSource(episodes);
      this.episodes = [...episodes];
    });

    this.pageInfo$.pipe(takeUntil(this.unsuscribe$)).subscribe(info => {
      this.info = info;
    })
  }

  ngAfterViewInit(): void {
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(100),
        filter(() => this.isUserNearBottom())
      )
      .subscribe(() => this.loadNextPage());
  }

  ngOnDestroy(): void {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();

    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  isUserNearBottom(): boolean {
    const scrollPosition = window.scrollY + window.innerHeight;
    const anchorPosition = this.bottomAnchor.nativeElement.offsetTop;
    return scrollPosition > anchorPosition;
  }

  loadNextPage(): void {
    const nextPage = this.info?.next;
    if (nextPage) {
      this.store.dispatch(loadEpisodesPage({pageUrl: nextPage}))
    }
  }

}
