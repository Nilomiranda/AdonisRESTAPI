'use strict'

const Route = use('Route')

// creating new user
Route.post('users', 'UserController.store')

// authenticating new user (JWT)
Route.get('sessions', 'SessionController.store')

module.exports = Route
