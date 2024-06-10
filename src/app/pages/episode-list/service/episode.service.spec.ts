import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EpisodeService } from './episode.service';
import { environment } from '../../../../environments/environment.development';
import { Episode } from '../../../core/models/episode.interface';
import { ApiEpisode } from '../../../core/models/api-episode.interface';

describe('EpisodeService', () => {
  let service: EpisodeService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.API_URL}/episode`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodeService],
    });
    service = TestBed.inject(EpisodeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve episodes via GET', () => {
    const dummyEpisodes: ApiEpisode = {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: [],
          url: 'url',
          created: 'created',
          charactersIds: ["1","2"],
          number: "E01",
          season: "S01"
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
          characters: [],
          url: 'url',
          created: 'created',
          charactersIds: ["1","2"],
          number: "E01",
          season: "S01"
        },
      ],
    };

    service.getEpisodes().subscribe((episodes) => {
      expect(episodes).toEqual(dummyEpisodes);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEpisodes);
  });

  it('should retrieve episodes by page via GET', () => {
    const dummyPageUrl = `${apiUrl}?page=2`;
    const dummyEpisodes: ApiEpisode = {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: [],
          url: 'url',
          created: 'created',
          charactersIds: ["1","2"],
          number: "E01",
          season: "S01"
        },
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
          characters: [],
          url: 'url',
          created: 'created',
          charactersIds: ["1","2"],
          number: "E01",
          season: "S01"
        },
      ],
    };

    service.getEpisodesByPage(dummyPageUrl).subscribe((episodes) => {
      expect(episodes).toEqual(dummyEpisodes);
    });

    const req = httpMock.expectOne(dummyPageUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEpisodes);
  });

  it('should retrieve episode by id via GET', () => {
    const episodeId = 1;
    const dummyEpisode: Episode = {
      id: episodeId,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [],
      url: 'url',
      created: 'created',
      charactersIds: ["1","2"],
      number: "E01",
      season: "S01"
    };

    service.getEpisodeById(episodeId).subscribe((episode) => {
      expect(episode).toEqual(dummyEpisode);
    });

    const req = httpMock.expectOne(`${apiUrl}/${episodeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyEpisode);
  });
});
