import { Injectable, signal, computed } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  async sendEmail(email: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }
}
