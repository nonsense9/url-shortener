import { Injectable, signal, computed } from '@angular/core';

export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private linksSignal = signal<Link[]>([
    {
      id: '1',
      originalUrl: 'https://google.com',
      shortUrl: 'link.eu/g7H2',
      createdAt: new Date(),
      clicks: 124
    }
  ]);

  links = computed(() => this.linksSignal());

  addLink(originalUrl: string, email?: string) {
    const newLink: Link = {
      id: Math.random().toString(36).substring(2, 9),
      originalUrl,
      shortUrl: `link.eu/${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date(),
      clicks: 0,
      email
    };

    this.linksSignal.update(current => [newLink, ...current]);
    return newLink;
  }
}
