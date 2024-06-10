import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { environment } from '../../../../environments/environment.development';
import { ApiCharacter } from '../../../core/models/api-character.interface';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.API_URL}/character`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService],
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve characters via GET', () => {
    const dummyCharacters: ApiCharacter = {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
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
          episodes:1
        },
        {
          id: 2,
          name: 'Morty Smith',
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
          episodes:1
        },
      ],
    };

    service.getCharacters().subscribe((characters) => {
      expect(characters).toEqual(dummyCharacters);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCharacters);
  });
});
