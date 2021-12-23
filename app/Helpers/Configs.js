'use strict';
const Model = use('App/Models/Config')
class Configs {
  static async getPairs() {
    const configs = await Model.pair('key', 'value');
    return configs;
  }

}
module.exports = Configs;
