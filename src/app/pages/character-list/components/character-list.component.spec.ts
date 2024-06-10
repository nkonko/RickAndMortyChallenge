import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Character } from '../../../core/models/character.interface';
import { Info } from '../../../core/models/info.interface';
import { CommonMaterialModule } from '../../../core/modules/material/common-material.module';
import { CustomTableComponent } from '../../../shared/custom-table/custom-table.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { selectCharacters, selectCharactersPages } from '../../../core/store/selectors/characters.selectors';
import { ElementRef } from '@angular/core';
import { loadCharacters } from '../../../core/store/actions/characters/characters.action';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let store: MockStore;
  let bottomAnchor: HTMLElement;
  let mockCharacters: Character[];
  let mockInfo: Info;

  beforeEach(async () => {
    mockCharacters = [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'url',
        episode: [],
        url: '',
        created: '',
        episodes: 1
      },
    ];

    mockInfo = {
      count: 1,
      pages: 1,
      next: null,
      prev: null,
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonMaterialModule,
        CustomTableComponent,
        RouterLink,
        FormsModule,
        CharacterListComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => 1 }),
          },
        },
        provideMockStore({
          selectors: [
            { selector: selectCharacters, value: mockCharacters },
            { selector: selectCharactersPages, value: mockInfo },
          ],
        }),

      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    bottomAnchor = document.createElement('div');
    component.bottomAnchor = { nativeElement: bottomAnchor } as ElementRef;
    fixture.detectChanges();
    })



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCharacters on ngOnInit', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadCharacters());
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    component.ngOnInit();
    const unsubscribeSpy = spyOn(component.unsuscribe$, 'next');
    const completeSpy = spyOn(component.unsuscribe$, 'complete');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();

    if (component.scrollSubscription) {
      expect(component.scrollSubscription.closed).toBeTrue();
    }
  });

  it('should apply filter correctly', () => {
    component.ngOnInit();
    component.filterValues = { name: 'Rick', status: 'Alive', species: 'Human' };
    component.applyFilter();

    expect(component.dataSource.filter).toBe(JSON.stringify(component.filterValues));
  });
});
