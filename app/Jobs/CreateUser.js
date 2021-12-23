'use strict';
const Env = use('Env');
const Mail = use('Mail');
const Logger = use('Logger')
const Common = use('App/Helpers/Common');

class CreateUser {
  static async handle(row) {
    if (Env.get('APP_ENV') != 'testing') {
      try {
        await Mail.send('emails.auth.create',
          {url: Env.get('APP_URL'), row}, (message) => {
            message.from(Env.get('MAIL_FROM_ADDRESS'))
            message.to(row.email)
            message.subject('Welcome to ' + Env.get('APP_NAME'))
          })
      } catch (e) {
        let message = {
          when: Common.getDateTime(),
          text: 'Failed to send email for Registration',
          response: e.response
        }
        Logger.transport('file').emerg(message);
      }
    }
  }

}

module.exports = CreateUser;
