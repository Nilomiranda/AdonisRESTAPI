'use strict'

const Sentry = require('@sentry/node')

const BaseExceptionHandler = use('BaseExceptionHandler')

const Env = use('Env')
const Youch = use('Youch') // error formater
const Config = use('Config')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    // checking if running in development mode
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request) // formats error messages
      const errorJSON = await youch.toJSON() // transform error msgs to JSON

      return response.status(error.status).send(errorJSON) // send error as response
    }

    /**
     * if out of development environment we just simply the error status
     */
    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error) {
    Sentry.init(Config.get('services.sentry'))
    Sentry.captureException(error)
  }
}

module.exports = ExceptionHandler
