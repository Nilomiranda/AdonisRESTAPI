'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
  user () {
    this.belongsTo('App/Models/User') // relation with user
  }

  project () {
    this.belongsTo('App/Models/Project') // relation with project
  }

  file () {
    this.belongsTo('App/Models/File') // relation with file
  }
}

module.exports = Task
