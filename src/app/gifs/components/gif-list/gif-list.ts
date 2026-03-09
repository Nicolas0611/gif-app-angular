import { Component, input } from '@angular/core';
import { GifListItem } from '../gif-list-item/gif-list-item';

@Component({
  selector: 'gifs-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  imageUrls = input.required<string[]>();
}
