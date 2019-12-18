import request from 'request';
import querystring from 'querystring';
import config from 'config';

const apikey = config.get('mailgun.apiKey');
const domainName = config.get('mailgun.domainName');
const apiUrl = `https://api:${apikey}@api.mailgun.net/v3/${domainName}/messages`;
const sender = 'Unique App <ankan.sircar@gmail.com>';

const getEmailBody = mail => {
  let emailBody = {};
  emailBody.from = sender;
  emailBody.subject = mail.subject;
  emailBody.text = mail.content;

  let toAddresses = [];
  let ccAddresses = [];
  let bccAddresses = [];

  mail.toAddress.forEach(item => {
    toAddresses.push(item);
  });
  emailBody.to = toAddresses.join(',');

  if (mail.ccAddress.length !== 0) {
    mail.ccAddress.forEach(item => {
      ccAddresses.push(item);
    });
    emailBody.cc = ccAddresses.join(',');
  }

  if (mail.bccAddress.length !== 0) {
    mail.bccAddress.forEach(item => {
      bccAddresses.push(item);
    });
    emailBody.bcc = bccAddresses.join(',');
  }

  return querystring.stringify(emailBody);
};

export default function(mailDetails) {
  return new Promise((resolve, reject) => {
    request(
      {
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        uri: apiUrl,
        body: getEmailBody(mailDetails),
        method: 'POST',
      },
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}
