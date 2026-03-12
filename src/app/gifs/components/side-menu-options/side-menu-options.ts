import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../services/gifs.service';

interface MenuOptions {
  label: string;
  subLabel?: string;
  router: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
  gifsService = inject(GifsService);

  menuOptions: MenuOptions[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Trending',
      router: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Search',
      subLabel: 'Search for Gifs',
      router: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ];
}
