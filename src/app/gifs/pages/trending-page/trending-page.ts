import { Component, inject } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  /*   imports: [GifList],
   */
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  gifsService = inject(GifsService);
  /*   gifs = computed(() => this.gifsService.trendingGifs());
   */

  onScroll(event: Event) {
    console.log(event);
  }
}
