import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CharacterDetailComponent } from './character-detail.component';
import { CommonMaterialModule } from '../../core/modules/material/common-material.module';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { of } from 'rxjs';
import { selectCharacterById, selectSelectedCharacter } from '../../core/store/selectors/characters.selectors';

describe('CharacterDetailComponent', () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;
  let store: MockStore;
  let route: ActivatedRoute;
  let location: LocationStrategy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonMaterialModule, CharacterDetailComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCharacterById(1), value: null },
            { selector: selectSelectedCharacter, value: null },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1',
            }),
          },
        },
        {
          provide: LocationStrategy,
          useValue: {
            back: jasmine.createSpy('back'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(LocationStrategy);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location.back on back()', () => {
    component.back();
    expect(location.back).toHaveBeenCalled();
  });

  it('should complete unsubscribe$ on ngOnDestroy', () => {
    const completeSpy = spyOn(component.unsubscribe$, 'complete').and.callThrough();
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
