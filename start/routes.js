'use strict'

const Route = use('Route')

// creating new user
Route.post('users', 'UserController.store')

// authenticating new user (JWT)
Route.get('sessions', 'SessionController.store')

// recovering password
Route.post('passwords', 'ForgotPasswordController.store')

module.exports = Route
