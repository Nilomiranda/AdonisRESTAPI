'use strict'

class Task {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
      due_date: 'date'
    }
  }
}

module.exports = Task
