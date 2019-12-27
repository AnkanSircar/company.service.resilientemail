import request from 'request';
import querystring from 'querystring';
import config from 'config';

const apikey = config.get('mailgun.apiKey');
const domainName = config.get('mailgun.domainName');
const apiUrl = `https://api:${apikey}@api.mailgun.net/v3/${domainName}/messages`;
const sender = 'Unique App <ankan.sircar@gmail.com>';

const getFormattedEmailArray = sourceArray => {
  let destinationArray = [];
  sourceArray.forEach(item => {
    destinationArray.push(item);
  });
  return destinationArray.join(',');
};

const getRequestBody = emailDetails => {
  let requestBody = {
    from: sender,
    subject: emailDetails.subject,
    text: emailDetails.content,
    to: getFormattedEmailArray(emailDetails.toAddress),
  };
  if (emailDetails.ccAddress.length !== 0) {
    requestBody.cc = getFormattedEmailArray(emailDetails.ccAddress);
  }
  if (emailDetails.bccAddress.length !== 0) {
    requestBody.bcc = getFormattedEmailArray(emailDetails.bccAddress);
  }
  return querystring.stringify(requestBody);
};

export default function(mailDetails) {

  if (!apikey) {
    return Promise.reject(new Error('Missing api key.'));
  }

  return new Promise((resolve, reject) => {
    request(
      {
        rejectUnauthorized: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        uri: apiUrl,
        body: getRequestBody(mailDetails),
        method: 'POST',
      },
      (err, res, body) => {
        console.log(`Error from mailgun ${err} ${JSON.stringify(res)}`);
        if (!err && res.statusCode === 200) {
          resolve(true);
        } else {
          reject(new Error('Mailgun failed to send email.'));
        }
      }
    );
  });
}
