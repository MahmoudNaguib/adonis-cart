'use strict'
const Env = use('Env');

class ContactController {
  async index({request, response,view}) {
    return view.render('contact.index')
  }

}

module.exports = ContactController
