const emailValidationErrorMessage = "Email addresses needs to be an array of valid emails";
const contentValidationErrorMessage = "Content needs value of type string";
const subjectValidationErrorMessage = "Subject needs value of type string";
const payloadValidationErrorMessage = "Send email payload can't be empty";

const isEmpty = (value) => (value === undefined || value === null || value.length <= 0 ? true : false);

const isValidEmail = (email) => {
    var regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
};

const isValidEmailArray = (emailAddresses) => {    
    return Array.isArray(emailAddresses) && emailAddresses.length > 0;
};

const errorMessage = (message) => ({    
        "isValid": false,
        "data": null,
        "error": message
    });

const getSanitizedData = (payload) => { 
    return {
    "toAddress": payload.toAddress,
    "ccAddress": isValidEmailArray(payload.ccAddress)? payload.ccAddress : [],
    "bccAddress": isValidEmailArray(payload.bccAddress)? payload.bccAddress : [],
    "content": payload.content,
    "subject": payload.subject
    };
};

const validMessage = (message) => ({
    "isValid": true,
    "data": getSanitizedData(message),
    "error": null
});

const emailArrayValidation = (emailAddresses) => {    
    for(let i=0; i<emailAddresses.length; i++) { 
        let element = emailAddresses[i];
        if(!isValidEmail(element)) {            
            return false;
        }
    }
    return true;        
};

const validation = (rawEmailPayload) => 
    isEmpty(rawEmailPayload)? errorMessage(payloadValidationErrorMessage)
    : isEmpty(rawEmailPayload.content) ? errorMessage(contentValidationErrorMessage)
    : isEmpty(rawEmailPayload.subject) ? errorMessage(subjectValidationErrorMessage)
    : !isValidEmailArray(rawEmailPayload.toAddress) || !emailArrayValidation(rawEmailPayload.toAddress)? errorMessage(emailValidationErrorMessage)    
    : isValidEmailArray(rawEmailPayload.ccAddress) && !emailArrayValidation(rawEmailPayload.ccAddress)? errorMessage(emailValidationErrorMessage)
    : isValidEmailArray(rawEmailPayload.bccAddress) && !emailArrayValidation(rawEmailPayload.bccAddress)? errorMessage(emailValidationErrorMessage)
    : validMessage(rawEmailPayload);


export default function (rawEmailPayload) { 
    return new Promise(function(resolve, reject) {
        resolve(validation(rawEmailPayload));
    });
};