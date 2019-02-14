'use strict'

const Route = use('Route')

// creating new user
Route.post('users', 'UserController.store').validator('User')

// authenticating new user (JWT)
Route.get('sessions', 'SessionController.store').validator('Session')

// recovering password
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword') // request reset
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword') // reset password

/**
 * The routes inside this group will only be accessible by an
 * authenticated user
 */
Route.group(() => {
  // File handling
  Route.post('files', 'FileController.store') // uploading file
  Route.get('files/:id', 'FileController.show') // downloading file

  // Project CRUD
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    ))

  // Task CRUD
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Task']
        ]
      ]
    ))
}).middleware(['auth'])

module.exports = Route
