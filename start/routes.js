'use strict'

const Route = use('Route')

// creating new user
Route.post('users', 'UserController.store')

// authenticating new user (JWT)
Route.get('sessions', 'SessionController.store')

// recovering password
Route.post('passwords', 'ForgotPasswordController.store') // request reset
Route.put('passwords', 'ForgotPasswordController.update') // reset password

// File handling
Route.post('files', 'FileController.store') // uploading file
Route.get('files/:id', 'FileController.show') // downloading file

module.exports = Route
