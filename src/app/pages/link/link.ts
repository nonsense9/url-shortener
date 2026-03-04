import { Component, inject, signal, computed } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-link',
  imports: [DatePipe, FormsModule],
  templateUrl: './link.html',
  styleUrl: './link.css',
  standalone: true
})
export class Link {
  protected readonly linkService = inject(LinkService);
  private readonly router = inject(Router);

  searchTerm = signal('');

  filteredLinks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const links = this.linkService.links();
    if (!term) return links;

    return links.filter(link =>
      link.originalUrl.toLowerCase().includes(term) ||
      link.shortUrl.toLowerCase().includes(term) ||
      link.id.toLowerCase().includes(term)
    );
  });

  protected goToDetail(id: string) {
    this.router.navigate(['/link', id]);
  }

  protected deleteLink(event: Event, id: string) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this link?')) {
      this.linkService.deleteLink(id);
    }
  }
}
