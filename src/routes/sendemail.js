import express from 'express';
import validateEmail from '../validation/validatepayload';
import mailgunSendEmail from '../external-api/mailgun-sendemail';
import sendgridSendEmail from '../external-api/sendgrid-sendemail';

const router = express.Router();

const badRequestStatusCode = 400;
const acceptedStatusCode = 202;
const serviceUnavailableStatusCode = 503;
const successStatusDetails = 'Send email request successfully accepted.';
const serviceUnavailableStatusDetails = 'Sorry email service is not available at the moment. Please try again later.';

const sendEmail = async(data) => {
  try {
    let mailgunResponse = await mailgunSendEmail(data);
    console.log(`Response from mailgun ${mailgunResponse}`);
  } catch (error) {
    console.log(`Error Response from mailgun ${error}`);
    let sendgridResponse = await sendgridSendEmail(data);
    console.log(`Response from sendgrid ${sendgridResponse}`);
  }
};

router.post('/sendemail', async(req, res) => {
  const emailRequest = req.body;
  let validationResult = await validateEmail(emailRequest);

  if (!validationResult.isValid) {
    let statusDetails = validationResult.error;
    res.status(badRequestStatusCode).send({statusCode: badRequestStatusCode, statusDetails});
  } else {
    try {
      await sendEmail(validationResult.data);
      res.status(acceptedStatusCode).send({statusCode: acceptedStatusCode, statusDetails: successStatusDetails});
    } catch (error) {
      res.status(serviceUnavailableStatusCode).send({statusCode: serviceUnavailableStatusCode, statusDetails: serviceUnavailableStatusDetails});
    }
  }
});

export default router;
