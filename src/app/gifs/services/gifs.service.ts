import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { map, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { GifsMapper } from '../utils/gifs.mapper';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
};

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);
  private page = signal<number>(0);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  trendingGifGrouped = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem('history', JSON.stringify(this.searchHistory()));
  });

  test = effect(() => {
    console.log({ grouped: this.trendingGifGrouped() });
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
        params: { api_key: environment.giphyApiKey, limit: 20, offset: this.page() * 20 },
      })
      .subscribe((res) => {
        const gifs = GifsMapper.mapGiphyToGifArray(res.data);
        this.trendingGifs.update((current) => [...current, ...gifs]);
        this.page.update((current) => current + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
        params: { api_key: environment.giphyApiKey, q: query, limit: 20 },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifsMapper.mapGiphyToGifArray(items)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        }),
      );
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query.toLowerCase()] ?? [];
  }
}
