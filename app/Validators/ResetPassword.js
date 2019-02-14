'use strict'

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
}

module.exports = ResetPassword
