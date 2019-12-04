const express = require('express');
const validateemailrequest = require('../validation/validate_email');
const mailgun_send_email = require('../external-api/mailgun_send_email');
const sendgrid_send_email = require('../external-api/sendgrid_send_email');

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
            let statusDetails = 'Send email request successfully accepted.';
            res.status(statusCode).send({statusCode, statusDetails});
        }
        else {
            let sendgridResponse = sendgrid_send_email(emailRequest);

            if(sendgridResponse) {
                let statusCode = 202;
                let statusDetails = 'Send email request successfully accepted.';
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
