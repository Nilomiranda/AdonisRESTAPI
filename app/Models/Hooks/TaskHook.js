'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  // check if task has a user set or if user was recently edited
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // proceeds with sending email
  const { username, email } = await taskInstance.users().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = await taskInstance

  await Mail.send(
    ['emails.newtask'], // email template
    { username, file, title, hasAttachment: !!file }, // variables to render in template
    message => {
      message
        .to(email)
        .from('me@danmiranda.io', 'Danilo Miranda | CEO')
        .subject('New task assigned to you! 👏👏👏')

      // checks if there's an attachment
      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
