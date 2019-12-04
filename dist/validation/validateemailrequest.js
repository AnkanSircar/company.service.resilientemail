const isEmpty = value => {
    return value === undefined || value == null || value.length <= 0 ? true : false;
};

const isValidEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const emailValidationErrorMessage = "ToAddress needs to be an array of valid emails";
const contentAndSubjectValidationErrorMessage = "Content and subject needs value of type string";
const payloadValidationErrorMessage = "Send email payload can't be empty";

const validation = rawEmailPayload => {

    if (isEmpty(rawEmailPayload)) {
        return {
            "isValid": false,
            "data": null,
            "error": payloadValidationErrorMessage
        };
    }

    if (!Array.isArray(rawEmailPayload.toAddress)) {
        return {
            "isValid": false,
            "data": null,
            "error": emailValidationErrorMessage
        };
    }

    if (isEmpty(rawEmailPayload.content) || isEmpty(rawEmailPayload.subject)) {
        return {
            "isValid": false,
            "data": null,
            "error": contentAndSubjectValidationErrorMessage
        };
    }

    for (let i = 0; i < rawEmailPayload.toAddress.length; i++) {
        let element = rawEmailPayload.toAddress[i];
        if (!isValidEmail(element)) {
            console.log(`not valid ${element}`);
            return {
                "isValid": false,
                "data": null,
                "error": emailValidationErrorMessage
            };
        }
    }

    let santizedData = {
        "toAddress": rawEmailPayload.toAddress,
        "content": rawEmailPayload.content,
        "subject": rawEmailPayload.subject
    };

    return {
        "isValid": true,
        "data": santizedData
    };
};

module.exports = function (rawEmailPayload) {
    return new Promise(function (resolve, reject) {
        resolve(validation(rawEmailPayload));
    });

    // check rawEmailPayload for empty 

};
//# sourceMappingURL=validateemailrequest.js.map