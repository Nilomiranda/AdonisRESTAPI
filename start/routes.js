'use strict'

const Route = use('Route')

// creating new user
Route.post('users', 'UserController.store')

// authenticating new user (JWT)
Route.get('sessions', 'SessionController.store')

// recovering password
Route.post('passwords', 'ForgotPasswordController.store') // request
Route.put('passwords', 'ForgotPasswordController.update')

module.exports = Route
