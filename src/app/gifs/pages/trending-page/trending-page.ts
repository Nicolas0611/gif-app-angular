import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

const LOAD_MORE_THRESHOLD = 300;

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
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + LOAD_MORE_THRESHOLD >= scrollHeight;
    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }
}
