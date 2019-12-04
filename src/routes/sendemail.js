const express = require('express');
const validateemailrequest = require('../validation/validateemailrequest');
const mailgun_send_email = require('../externalapi/mailgun_send_email');
const sendgrid_send_email = require('../externalapi/sendgrid_send_email');

const router = express.Router();

router.post('/sendemail', async(req, res)=>{
    
    const emailRequest = req.body;  
    let validationResult = await validateemailrequest(emailRequest);
    
    if(!validationResult.isValid) {
        let statusCode = 400;
        let statusDetails = validationResult.error;
        res.status(statusCode).send({statusCode, statusDetails});   
    }
    else {
        let mailgunResponse = await mailgun_send_email(validationResult.data);
        
        if(mailgunResponse) {
            let statusCode = 202;
            let statusDetails = 'Send email request accepted to process.';
            res.status(statusCode).send({statusCode, statusDetails});
        }
        else {
            let sendgridResponse = sendgrid_send_email(emailRequest);

            if(sendgridResponse) {
                let statusCode = 202;
                let statusDetails = 'Send email request accepted to process.';
                res.status(statusCode).send({statusCode, statusDetails});    
            }
            else {
                let statusCode = 503;
                let statusDetails = 'Sorry email service is not available at the moment. Please try again later.';
                res.status(statusCode).send({statusCode, statusDetails}); 
            }
        }
    }   

});

module.exports = router;
