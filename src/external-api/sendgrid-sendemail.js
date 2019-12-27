import request from 'request';
import config from 'config';

const apiUrl = config.get('sendgrid.apiUrl');
const apiKey = config.get('sendgrid.apiKey');
const senderEmail = 'ankan.sircar@gmail.com';
const senderName = 'Unique App';

const getFormattedEmailArray = emailAddress => {
  let fromattedEmailArray = [];
  emailAddress.forEach(item => {
    fromattedEmailArray.push({email: item});
  });
  return fromattedEmailArray;
};

const getPersonalizationObject = mail => {
  let personalization = {
    to: getFormattedEmailArray(mail.toAddress),
    subject: mail.subject,
  };
  if (mail.ccAddress.length !== 0) {
    personalization.cc = getFormattedEmailArray(mail.ccAddress);
  }
  if (mail.bccAddress.length !== 0) {
    personalization.bcc = getFormattedEmailArray(mail.bccAddress);
  }
  return personalization;
};

const getRequestBody = emailDetails => {
  let personalizations = [];
  personalizations.push(getPersonalizationObject(emailDetails));
  let content = [];
  content.push({type: 'text/plain', value: emailDetails.content});

  let sendEmailRequest = {
    personalizations,
    content,
    from: {
      email: senderEmail,
      name: senderName,
    },
  };
  return JSON.stringify(sendEmailRequest);
};

export default function(emailDetails) {
  return new Promise((resolve, reject) => {
    request(
      {
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + apiKey,
        },
        uri: apiUrl,
        body: getRequestBody(emailDetails),
        method: 'POST',
      },
      (err, res, body) => {
        if (!err && res.statusCode === 202) {
          resolve(true);
        } else {
          reject(new Error('Sendgrid failed to send email.'));
        }
      }
    );
  });
}
