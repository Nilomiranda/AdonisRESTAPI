'use strict'

const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      // retrieving email sent in request
      const email = request.input('email')

      // finding user with the informed email
      const user = await User.findByOrFail('email', email)

      // registering the token
      user.token = crypto.randomBytes(10).toString('hex') // random token
      user.token_created_at = new Date() // date of when token was created

      await user.save() // saves token to the user

      // script to send email
      /**
       * .send() method requires a few parameters
       * @param {string} email template Address of template to serve the email inside resources/views
       * @param {Object} variables to be sent to the template
       * @param {Function} message set parameters like sender and receiver
       */
      await Mail.send(
        'emails.forgotpass',
        { email, link: `https://127.0.0.1:3333/passwords/${user.token}` },
        message => {
          message.from('me@danmiranda.io')
          message.to(email)
        }
      )
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message:
            'Something went wrong. This email does not seem to be from a valid user'
        }
      })
    }
  }

  async update ({ request, response, params }) {
    try {
      const { password } = request.all() // recovering email from request
      const { token } = params

      const user = await User.findByOrFail('token', token) // looking for user that matches the token provided

      // checking if token is expired
      const tokenExpired = moment()
        /**
         * gets the exact moment the request is happening and checks
         * and subtract 2 days from it as 2 days is the token's duration
         */
        .subtract(2, 'days')
        /**
         * checks if NOW is already past to days from the day the token
         * was generated
         */
        .isAfter(user.token_created_at)

      // if token is expired returns an error
      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message:
              'Your token is expired, please request a new password reset'
          }
        })
      }

      // if token is valid then proceeds
      user.token = null // destroy current token
      user.token_created_at = null // reset token expiry date
      user.password = password // sets new password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Something went wrong. This token seems invalid for you'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
