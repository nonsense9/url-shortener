import { Injectable, signal, computed } from '@angular/core';

export interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
  email?: string;
  analytics?: {
    clicksTrend: { date: string, count: number }[];
    devices: { type: string, percentage: number }[];
    sources: { name: string, percentage: number }[];
    visitors: { unique: number, returning: number };
  }
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
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      clicks: 124,
      analytics: {
        clicksTrend: [
          { date: '2026-02-25', count: 12 },
          { date: '2026-02-26', count: 18 },
          { date: '2026-02-27', count: 15 },
          { date: '2026-02-28', count: 25 },
          { date: '2026-03-01', count: 22 },
          { date: '2026-03-02', count: 30 },
          { date: '2026-03-03', count: 12 },
        ],
        devices: [
          { type: 'Mobile', percentage: 65 },
          { type: 'Desktop', percentage: 35 }
        ],
        sources: [
          { name: 'Direct', percentage: 40 },
          { name: 'Social', percentage: 35 },
          { name: 'Referral', percentage: 25 }
        ],
        visitors: { unique: 85, returning: 39 }
      }
    },
    {
      id: '2',
      originalUrl: 'https://github.com',
      shortUrl: 'link.eu/git8',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      clicks: 452,
      analytics: {
        clicksTrend: [
          { date: '2026-02-25', count: 45 },
          { date: '2026-02-26', count: 68 },
          { date: '2026-02-27', count: 55 },
          { date: '2026-02-28', count: 85 },
          { date: '2026-03-01', count: 72 },
          { date: '2026-03-02', count: 90 },
          { date: '2026-03-03', count: 37 },
        ],
        devices: [
          { type: 'Mobile', percentage: 30 },
          { type: 'Desktop', percentage: 70 }
        ],
        sources: [
          { name: 'Direct', percentage: 20 },
          { name: 'Social', percentage: 60 },
          { name: 'Referral', percentage: 20 }
        ],
        visitors: { unique: 310, returning: 142 }
      }
    },
    {
      id: '3',
      originalUrl: 'https://angular.dev',
      shortUrl: 'link.eu/ng21',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      clicks: 171,
      analytics: {
        clicksTrend: [
          { date: '2026-02-25', count: 42 },
          { date: '2026-02-26', count: 38 },
          { date: '2026-02-27', count: 35 },
          { date: '2026-02-28', count: 22 },
          { date: '2026-03-01', count: 15 },
          { date: '2026-03-02', count: 12 },
          { date: '2026-03-03', count: 7 },
        ],
        devices: [
          { type: 'Mobile', percentage: 50 },
          { type: 'Desktop', percentage: 50 }
        ],
        sources: [
          { name: 'Direct', percentage: 50 },
          { name: 'Social', percentage: 10 },
          { name: 'Referral', percentage: 40 }
        ],
        visitors: { unique: 60, returning: 29 }
      }
    }
  ]);
  static generateId() {
    return Math.random().toString(36).substring(2, 9)
  }

  links = computed(() => this.linksSignal());

  addLink(originalUrl: string, email?: string) {
    const newLink: Link = {
      id: LinkService.generateId(),
      originalUrl,
      shortUrl: `link.eu/${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date(),
      clicks: 0,
      email,
      analytics: {
        clicksTrend: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          count: 0
        })),
        devices: [
          { type: 'Mobile', percentage: 0 },
          { type: 'Desktop', percentage: 0 }
        ],
        sources: [
          { name: 'Direct', percentage: 0 },
          { name: 'Social', percentage: 0 },
          { name: 'Referral', percentage: 0 }
        ],
        visitors: { unique: 0, returning: 0 }
      }
    };

    this.linksSignal.update(current => [newLink, ...current]);
    return newLink;
  }
}
