import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Link, LinkService } from '../../services/link.service';
import {
  email,
  form,
  FormField,
  pattern,
  required,
  submit,
} from '@angular/forms/signals';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-home',
  imports: [ ReactiveFormsModule, FormField, FormsModule ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  readonly linkService = inject(LinkService);
  readonly emailService = inject(EmailService);

  urlModel = signal({ url: '' });
  emailModel = signal({ email: '' });
  isGenerating = signal(false);
  isSendingEmail = signal(false);
  isEmailSent = signal(false);
  latestLink = signal<Link | null>(null);
  isCopied = signal(false);

  urlForm = form(this.urlModel, (fieldPath) => {
    required(fieldPath.url, { message: 'URL is required' });
    pattern(fieldPath.url, () => new RegExp('https?://.+'), {
      message: 'Please enter a valid URL starting with http:// or https://',
    });
  });

  emailForm = form(this.emailModel, (fieldPath) => {
    email(fieldPath.email, { message: 'Please enter a valid email' });
  });

  constructor() {
  }

  protected async onSendEmail() {
    await submit(this.emailForm, async () => {
      this.isSendingEmail.set(true);
      this.isEmailSent.set(false);
      const { email } = this.emailModel();
      await this.emailService.sendEmail(email);
      this.isSendingEmail.set(false);
      this.isEmailSent.set(true);
      this.emailForm.email().reset('');

      setTimeout(() => this.isEmailSent.set(false), 3000);
    });
  }

  protected async onSubmit() {
    await submit(this.urlForm, async () => {
      this.isGenerating.set(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const { url } = this.urlModel();
      const result = this.linkService.addLink(url);
      this.latestLink.set(result);
      this.isGenerating.set(false);
      this.urlForm.url().reset('');
    });
  }

  protected copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    });
  }
}
