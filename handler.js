'use strict'
const aws = require('aws-sdk')
const SES = new aws.SES({ region: 'eu-west-1' })

const sendError = (status, message) => ({
  statusCode: status,
  body: JSON.stringify({ message })
})

module.exports.dispatchEmail = async event => {
  const { to, subject, message, from } = JSON.parse(event.body)
  const token = event.headers['X-Token']
  if (!token || token !== process.env.TOKEN) {
    return sendError(401, 'Unauthorized')
  }

  if (!to || !subject || !message || !from) {
    return sendError(400, 'Invalid POST body')
  }

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Data: message
        }
      },
      Subject: {
        Data: subject
      }
    },
    Source: from
  }

  try {
    await SES
      .sendEmail(params)
      .promise()
  } catch(e) {
    console.error(e)
    return sendError(500, 'Internal server error')
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email sent' }),
  }
}
