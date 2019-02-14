'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   */
  async index () {
    const projects = await Project.query()
      .with('user')
      .fetch() // looking for projects in database

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   */
  async store ({ request, auth }) {
    const userId = auth.user.id // retrieving user id currently logged
    const data = request.only(['title', 'description'])

    const project = Project.create({ ...data, user_id: userId })

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.load('user') // loads user information for desired project
    await project.load('tasks') // loads tasks inforation for desired project

    return project
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   */
  async update ({ params, request }) {
    const data = request.only(['title', 'description'])
    const project = await Project.findOrFail(params.id) // looking for project

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   */
  async destroy ({ params, response }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()

    return response.status(200).send({ success: { message: 'Project deleted' } })
  }
}

module.exports = ProjectController
