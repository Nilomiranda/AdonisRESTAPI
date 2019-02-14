'use strict'

const Antl = use('Antl')

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      password: 'required|confirmed',
      token: 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
