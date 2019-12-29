import { Injectable } from '@angular/core';
import * as Mailgun from 'mailgun.js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MailingService {
  DOMAIN = environment.proxy + 'sandbox624af51f306748fba783b3cf289db10e.mailgun.org';
  mg;
  constructor() {
    this.mg = Mailgun.client({username: 'api', key: environment.mailgun.MAILGUN_API_KEY});
  }

  sendMail(to: string, subject: string, text: string) {
    this.mg.messages.create( this.DOMAIN, {
      from: 'Mik Brz Kotrak <mailgun@sandbox-123.mailgun.org>',
      to,
      subject,
      text,
      html: '<h1>Testing some Mailgun awesomness!</h1>'
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
  }
}
