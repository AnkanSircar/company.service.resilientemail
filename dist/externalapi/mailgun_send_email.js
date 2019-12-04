const request = require('request');
const querystring = require('querystring');
const config = require('config');

const apikey = config.get('mailgun.apiKey');
const domainName = config.get('mailgun.domainName');
const apiUrl = `https://api:${apikey}@api.mailgun.net/v3/${domainName}/messages`;
const sender = 'Unique App <ankan.sircar@gmail.com>';

const getEmailBody = mail => {
    let toAddresses = [];
    mail.toAddress.forEach(item => {
        toAddresses.push(item);
    });

    return querystring.stringify({
        from: sender,
        to: toAddresses.join(','),
        subject: mail.subject,
        text: mail.content
    });
};

module.exports = function (mailDetails) {
    return new Promise((resolve, reject) => {
        request({
            rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: apiUrl,
            body: getEmailBody(mailDetails),
            method: 'POST'
        }, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                console.log(`Mailgun request successful. Details : ${body}`);
                resolve(true);
            } else {
                console.log(`Mailgun request failed with error : ${res.statusCode} ${res.body}`);
                resolve(false);
            }
        });
    });
};
//# sourceMappingURL=mailgun_send_email.js.map