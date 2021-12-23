'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments();
      table.bigInteger('post_id').unsigned().nullable().index();
      table.text('content').nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }
  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
