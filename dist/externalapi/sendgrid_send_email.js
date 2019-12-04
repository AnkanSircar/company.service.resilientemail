const request = require('request');
const config = require('config');

const apiUrl = config.get('sendgrid.apiUrl');
const apiKey = config.get('sendgrid.apiKey');
const senderEmail = 'ankan.sircar@gmail.com';
const senderName = 'Unique App';

const getEmailBody = mail => {
    let requestSendMail = {};
    let to = [];

    mail.toAddress.forEach(item => {
        to.push({ "email": item });
    });

    let personalizations = [];
    personalizations.push({ "to": to, "subject": mail.subject });

    let content = [];
    content.push({ "type": "text/plain", "value": mail.content });

    requestSendMail.personalizations = personalizations;
    requestSendMail.content = content;
    requestSendMail.from = { "email": senderEmail, "name": senderName };

    // console.log(`getEmailBody : ${JSON.stringify(requestSendMail)}`);
    return JSON.stringify(requestSendMail);
};

module.exports = function (mailDetails) {
    return new Promise((resolve, reject) => {
        request({
            rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + apiKey
            },
            uri: apiUrl,
            body: getEmailBody(mailDetails),
            method: 'POST'
        }, (err, res, body) => {
            if (!err && res.statusCode === 202) {
                console.log(`Sendgrid request successful. Details : ${JSON.stringify(res)}`);
                resolve(true);
            } else {
                console.log(`Sendgrid request failed with error : ${err} ${JSON.stringify(res)}`);
                resolve(false);
            }
        });
    });
};
//# sourceMappingURL=sendgrid_send_email.js.map