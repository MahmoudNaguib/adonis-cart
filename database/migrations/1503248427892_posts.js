'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments();
      table.bigInteger('section_id').unsigned().nullable().index();
      table.string('title', 180).nullable();
      table.text('content').nullable();
      table.string('image', 180).nullable();
      table.text('tags').nullable();
      table.text('meta_keywords').nullable();
      table.text('meta_description').nullable();
      table.boolean('is_active').nullable().defaultTo(1).index();
      table.bigInteger('created_by').unsigned().nullable().index();
      table.timestamps();
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
