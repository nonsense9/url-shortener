import { Component, inject, input, computed } from '@angular/core';
import { LinkService } from '../../../services/link.service';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-detail',
  standalone: true,
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './link-detail.html',
})
export class LinkDetail {
  private readonly linkService = inject(LinkService);

  id = input.required<string>();

  link = computed(() => this.linkService.links().find(l => l.id === this.id()));

  trend = computed(() => {
    const l = this.link();
    const trendData = l?.analytics?.clicksTrend;
    if (!trendData || trendData.length < 2) return { value: 0, isPositive: true };

    const mid = Math.floor(trendData.length / 2);
    const firstHalf = trendData.slice(0, mid).reduce((acc, curr) => acc + curr.count, 0);
    const secondHalf = trendData.slice(-mid).reduce((acc, curr) => acc + curr.count, 0);

    if (firstHalf === 0) {
      return { value: secondHalf > 0 ? 100 : 0, isPositive: secondHalf >= 0 };
    }

    const diff = ((secondHalf - firstHalf) / firstHalf) * 100;
    return {
      value: Math.abs(diff),
      isPositive: diff >= 0
    };
  });

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
