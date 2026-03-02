import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Link, LinkService } from '../../services/link.service';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  readonly fb = inject(FormBuilder)
  readonly linkService = inject(LinkService)
  urlForm = this.fb.group({
    url: ['', [Validators.required, Validators.pattern('https?://.+')]]
  });

  isGenerating = signal(false);
  latestLink = signal<Link | null>(null);
  isCopied = signal(false);
  constructor() {}

  protected async onSubmit() {
    if (this.urlForm.valid) {
      this.isGenerating.set(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = this.linkService.addLink(this.urlForm.value.url!);
      this.latestLink.set(result);
      this.isGenerating.set(false);
      this.urlForm.reset();
    }
  }

  protected copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }
}
