'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    // request data coming from the request
    const data = request.only(['username', 'email', 'password'])

    // creates a new user based on the fetched data
    const user = await User.create(data)

    // returns newly created user
    return user
  }
}

module.exports = UserController
