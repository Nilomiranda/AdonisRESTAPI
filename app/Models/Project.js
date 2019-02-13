'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  user () {
    return this.belongsTo('App/Models/User') // relation with user
  }

  tasks () {
    return this.hasMany('App/Models/Task') // relation with tasks
  }
}

module.exports = Project
