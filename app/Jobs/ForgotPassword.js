'use strict';
const Env = use('Env');
const Mail = use('Mail');
const Logger = use('Logger')
const Common = use('App/Helpers/Common');

class ForgotPassword {
  static async handle(row) {
    if (Env.get('APP_ENV') != 'testing') {
      try {
        await Mail.send('emails.auth.forgot-password',
          {url: Env.get('APP_URL'), row}, (message) => {
            message.from(Env.get('MAIL_FROM_ADDRESS'))
            message.to(row.email)
            message.subject(Env.get('APP_NAME') + ' - Forgot password')
          })
      } catch (e) {
        let message = {
          when: Common.getDateTime(),
          text: 'Failed to send email for Forgot password',
          response: e.response
        }
        Logger.transport('file').emerg(message);
      }
    }
  }

}

module.exports = ForgotPassword;
