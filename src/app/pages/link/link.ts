import { Component, inject } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [DatePipe],
  templateUrl: './link.html',
  styleUrl: './link.css',
  standalone: true
})
export class Link {
  protected readonly linkService = inject(LinkService);
  private readonly router = inject(Router);

  protected goToDetail(id: string) {
    this.router.navigate(['/link', id]);
  }
}
