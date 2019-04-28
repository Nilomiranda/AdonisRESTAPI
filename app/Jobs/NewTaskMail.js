'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewTaskMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, file, title }) {
    console.log(`Job: ${NewTaskMail.key}`)
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
}

module.exports = NewTaskMail

