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
}
