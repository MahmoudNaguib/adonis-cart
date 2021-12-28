'use strict';
const Env = use('Env');
const Mail = use('Mail');
const Logger = use('Logger')
const Common = use('App/Helpers/Common');
const UserModel = use('App/Models/User');

class SendNotificationEmail {
  static async handle(row) {
    if (Env.get('APP_ENV') != 'testing') {
      try {
        let user = await UserModel.query().where('id', row.user_id).first();
        user=user.toJSON();
        await Mail.send('emails.notifications.create',
          {row,user}, (message) => {
            message.from(Env.get('MAIL_FROM_ADDRESS'))
            message.to(user.email)
            message.subject('Welcome to ' + Env.get('APP_NAME'))
          })
      } catch (e) {
        let message = {
          when: Common.getDateTime(),
          text: 'Failed to send email for notification#'+row.id,
          response: e.response
        }
        Logger.transport('file').emerg(message);
      }
    }
  }

}

module.exports = SendNotificationEmail;
