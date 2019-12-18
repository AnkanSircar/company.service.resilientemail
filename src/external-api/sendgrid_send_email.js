import request from 'request';
import config from 'config';

const apiUrl = config.get('sendgrid.apiUrl');
const apiKey = config.get('sendgrid.apiKey');
const senderEmail = 'ankan.sircar@gmail.com';
const senderName = 'Unique App';

const getEmailBody = mail => {
  let requestSendMail = {};
  let personalization = {};

  let to = [];
  let cc = [];
  let bcc = [];

  mail.toAddress.forEach(item => {
    to.push({email: item});
  });
  personalization.to = to;
  personalization.subject = mail.subject;

  if (mail.ccAddress.length !== 0) {
    mail.ccAddress.forEach(item => {
      cc.push({email: item});
    });
    personalization.cc = cc;
  }

  if (mail.bccAddress.length !== 0) {
    mail.bccAddress.forEach(item => {
      bcc.push({email: item});
    });
    personalization.bcc = bcc;
  }

  let personalizations = [];
  personalizations.push(personalization);

  let content = [];
  content.push({type: 'text/plain', value: mail.content});

  requestSendMail.personalizations = personalizations;
  requestSendMail.content = content;
  requestSendMail.from = {email: senderEmail, name: senderName};

  return JSON.stringify(requestSendMail);
};

export default function(mailDetails) {
  return new Promise((resolve, reject) => {
    request(
      {
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + apiKey,
        },
        uri: apiUrl,
        body: getEmailBody(mailDetails),
        method: 'POST',
      },
      (err, res, body) => {
        if (!err && res.statusCode === 202) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
