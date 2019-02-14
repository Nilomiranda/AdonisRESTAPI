'use strict'

const Task = use('App/Models/Task')

class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   */
  async index ({ params }) {
    const projectId = params.projects_id

    const task = await Task.query()
      .where('project_id', projectId)
      .with('users')
      .fetch()

    return task
  }

  /**
   * Create/save a new task.
   * POST tasks
   */
  async store ({ request, params }) {
    const projectId = params.projects_id
    const data = request.only([
      'user_id',
      'file_id',
      'title',
      'description',
      'due_date'
    ])

    const task = await Task.create({ ...data, project_id: projectId })

    return task
  }

  /**
   * Display a single task.
   * GET tasks/:id
   */
  async show ({ params }) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update ({ params, request }) {
    const data = request.only([
      'user_id',
      'file_id',
      'title',
      'description',
      'due_date'
    ])

    const task = await Task.findOrFail(params.id)
    task.merge(data)

    await task.save()
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   */
  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
