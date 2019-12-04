const isEmpty = (value) => {
    return (value === undefined || value == null || value.length <= 0) ? true : false;
};

const isValidEmail = (email) => {
    var regExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExpression.test(String(email).toLowerCase());
};

const isValidEmailArray =(emailAddresses) => {
    return Array.isArray(emailAddresses) && emailAddresses.length > 0
};

const emailValidationErrorMessage = "Email addresses needs to be an array of valid emails";
const contentAndSubjectValidationErrorMessage = "Content and subject needs value of type string";
const payloadValidationErrorMessage = "Send email payload can't be empty";

const validation = (rawEmailPayload) => {

    if(isEmpty(rawEmailPayload)){
        return {
            "isValid": false,
            "data": null,
            "error": payloadValidationErrorMessage  
        };
    }    
    else if(!isValidEmailArray(rawEmailPayload.toAddress)){
        return {
            "isValid": false,
            "data": null,
            "error": emailValidationErrorMessage
        };
    }
    else if(isEmpty(rawEmailPayload.content) || isEmpty(rawEmailPayload.subject)){
        return {
            "isValid": false,
            "data": null,
            "error": contentAndSubjectValidationErrorMessage
        };
    }
    else {

        for(let i=0; i<rawEmailPayload.toAddress.length; i++) { 
            let element = rawEmailPayload.toAddress[i];
            if(!isValidEmail(element)) {
                console.log(`not valid ${element}`);
                return {
                    "isValid": false,
                    "data": null,
                    "error": emailValidationErrorMessage
                };
            }
        }

        if(isValidEmailArray(rawEmailPayload.ccAddress)) {

            for(let i=0; i<rawEmailPayload.ccAddress.length; i++) { 
                let element = rawEmailPayload.ccAddress[i];
                if(!isValidEmail(element)) {
                    console.log(`not valid ${element}`);
                    return {
                        "isValid": false,
                        "data": null,
                        "error": emailValidationErrorMessage
                    };
                }
            }

        }
        
        if(isValidEmailArray(rawEmailPayload.bccAddress)) {

            for(let i=0; i<rawEmailPayload.bccAddress.length; i++) { 
                let element = rawEmailPayload.bccAddress[i];
                if(!isValidEmail(element)) {
                    console.log(`not valid ${element}`);
                    return {
                        "isValid": false,
                        "data": null,
                        "error": emailValidationErrorMessage
                    };
                }
            }            

        }       
        
        
        let santizedData = {
            "toAddress": rawEmailPayload.toAddress,
            "ccAddress": isValidEmailArray(rawEmailPayload.ccAddress)? rawEmailPayload.ccAddress : [],
            "bccAddress": isValidEmailArray(rawEmailPayload.bccAddress)? rawEmailPayload.bccAddress : [],
            "content": rawEmailPayload.content,
            "subject": rawEmailPayload.subject
        };
    
        return {
            "isValid": true,
            "data": santizedData,
            "error": null
        };
    }

    
};


module.exports = function(rawEmailPayload) {    
    return new Promise(function(resolve, reject){
        resolve(validation(rawEmailPayload));
    });
};