import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Link, LinkService } from '../../services/link.service';
import {
  email,
  form, FormField,
  PathKind, pattern,
  required, SchemaPathTree, submit,
} from '@angular/forms/signals';
import { EmailService } from '../../services/email.service';

interface UrlForm {
  url: string;
  email: string;
}

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    FormField,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  readonly linkService = inject(LinkService)
  readonly emailService = inject(EmailService)
  formModel = signal<UrlForm>({
    email: '',
    url: ''
  });
  isGenerating = signal(false);
  isSendingEmail = signal(false);
  latestLink = signal<Link | null>(null);
  isCopied = signal(false);

  urlForm = form(this.formModel, (fieldPath: SchemaPathTree<UrlForm, PathKind.Root>) => {
    required(fieldPath.url, { message: 'Url is required' });
    pattern(fieldPath.url, () => new RegExp('https?://.+'), { message: 'Please enter a valid URL starting with http:// or https://' });
    email(fieldPath.email, { message: 'Please enter a valid email' })
  })

  constructor() {}

  protected async onSendEmail() {
    const { email } = this.formModel();
    if (this.urlForm.email().valid() && email) {
      this.isSendingEmail.set(true);
      await this.emailService.sendEmail(email);
      this.isSendingEmail.set(false);
      this.urlForm.email().reset('');
    }
  }

  protected async onSubmit() {
    if (this.urlForm.url().valid!) {
      this.isGenerating.set(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      await submit(this.urlForm, async () => {
        const { url } = this.formModel();
        const result = this.linkService.addLink(url);
        this.latestLink.set(result);
        this.isGenerating.set(false);
        this.urlForm.url().reset('');
      })
    }
  }

  protected copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }
}
