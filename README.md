# Email dispatcher

Service to send emails from TKO-äly's services. Build on serverless and AWS SES.

## Development

1. Install [serverless](https://www.serverless.com/framework/docs/getting-started/)
2. `yarn`
3. `sls offline` 

## Deployment

Push to master.

## Using in applications

`POST ${email-dispatcher url}`

`X-Token: [auth token from aws secrets manager]`

Body:

```
{
  "to": "email@email.com",
  "subject": "Hello world",
  "message": "Hello world",
  "from": "email2@email.com"
}
```
