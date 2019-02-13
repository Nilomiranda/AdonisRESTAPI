'use strict'

const File = use('App/Models/File') // importing File model
const Helpers = use('Helpers') // helper functions from adonis

class FileController {
  async store ({ request, response }) {
    try {
      // checking if a file is being sent
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' }) // getting the file data

      // giving a new name to the uploaded file
      const fileName = `${Date.now()}.${upload.subtype}`

      // uploading the file to our machine
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // checking if file was succesfully uploaded
      if (!upload.moved()) {
        throw upload.error()
      }

      // creating a new file data in our database
      const file = await File.create({
        file: fileName, // created name for the file
        name: upload.clientName, // name of the file given by the user
        type: upload.type, // file type: image, pdf, etc...
        subtype: upload.subtype // file subtime, (e.g images, png, jpeg, etc...)
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Something went wrong during file upload' } })
    }
  }

  async show ({ params, response }) {
    // retrieving file data from database
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
}

module.exports = FileController
