import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { Observable, Subject, switchMap } from 'rxjs';
import { Character } from '../../core/models/character.interface';
import { Store } from '@ngrx/store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { selectCharactersById } from '../../core/store/selectors/character.selectors';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonMaterialModule, RouterLink],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character$!: Observable<Character | undefined>;
  unsuscribe$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.store.select(selectCharactersById(id));
      })
    );
  }

  print() {
    window.print()
  }
}
