import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {
  gifs = signal<Gif[]>([]);
  gifsService = inject(GifsService);

  onSearchGifs(query: string) {
    this.gifsService.searchGifs(query).subscribe((data) => {
      this.gifs.set(data);
    });
  }
}
