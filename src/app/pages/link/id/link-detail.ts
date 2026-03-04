import { Component, inject, input, computed } from '@angular/core';
import { LinkService } from '../../../services/link.service';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { calculateTrend, getTrendPath } from '../../../utils/analytics.utils';

@Component({
  selector: 'app-link-detail',
  standalone: true,
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './link-detail.html',
})
export class LinkDetail {
  private readonly linkService = inject(LinkService);
  private readonly router = inject(Router);

  id = input.required<string>();

  link = computed(() => this.linkService.links().find(l => l.id === this.id()));

  trend = computed(() => calculateTrend(this.link()?.analytics?.clicksTrend));

  protected getTrendPath(trend: { count: number }[] | undefined): string {
    return getTrendPath(trend);
  }

  protected async deleteLink() {
    if (confirm('Are you sure you want to delete this link? This action cannot be undone.')) {
      this.linkService.deleteLink(this.id());
      await this.router.navigate(['/link']);
    }
  }

  uniquePercent(visitors: { unique: number; returning: number } | undefined) {
    const unique = visitors?.unique ?? 0;
    const returning = visitors?.returning ?? 0;
    const total = unique + returning;

    if (total === 0) return 0;
    return (unique / total) * 100;
  }
}
