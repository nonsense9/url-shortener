import { Component, inject, input } from '@angular/core';
import { LinkService } from '../../../services/link.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-detail',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './link-detail.html',
})
export class LinkDetail {
  private readonly linkService = inject(LinkService);

  id = input.required<string>();

  link = () => this.linkService.links().find(l => l.id === this.id());

  protected getTrendPath(trend: { count: number }[] | undefined): string {
    if (!trend || trend.length === 0) return '';
    const max = Math.max(...trend.map(t => t.count), 1);
    const width = 200;
    const height = 40;
    const step = width / (trend.length - 1);

    const points = trend.map((t, i) => {
      const x = i * step;
      const y = height - (t.count / max) * height;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    });

    return points.join(' ');
  }
}
