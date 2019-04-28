'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  // check if task has a user set or if user was recently edited
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // proceeds with sending email
  const { username, email } = await taskInstance.users().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = await taskInstance

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
