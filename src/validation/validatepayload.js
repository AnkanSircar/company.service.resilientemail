import validateemail from './validateemail';

const emailValidationErrorMessage = 'Email addresses needs to be an array of valid emails';
const contentValidationErrorMessage = 'Content needs value of type string';
const subjectValidationErrorMessage = 'Subject needs value of type string';
const payloadValidationErrorMessage = "Send email payload can't be empty";

const isEmpty = value =>
  !!(value === undefined || value === null || value.length <= 0);

const isArrayContainMoreThanOneElement = elements => {
  return Array.isArray(elements) && elements.length > 0;
};

const errorMessage = message => ({
  isValid: false,
  data: null,
  error: message,
});

const validMessage = message => ({
  isValid: true,
  data: getSanitizedData(message),
  error: null,
});

const getSanitizedData = payload => {
  return {
    toAddress: payload.toAddress,
    ccAddress: isArrayContainMoreThanOneElement(payload.ccAddress) ? payload.ccAddress : [],
    bccAddress: isArrayContainMoreThanOneElement(payload.bccAddress) ? payload.bccAddress : [],
    content: payload.content,
    subject: payload.subject,
  };
};


const validation = rawEmailPayload =>
  isEmpty(rawEmailPayload)
    ? errorMessage(payloadValidationErrorMessage)
    : isEmpty(rawEmailPayload.content)
      ? errorMessage(contentValidationErrorMessage)
      : isEmpty(rawEmailPayload.subject)
        ? errorMessage(subjectValidationErrorMessage)
        : !validateemail(rawEmailPayload)
          ? errorMessage(emailValidationErrorMessage)
          : validMessage(rawEmailPayload);

export default function(rawEmailPayload) {
  return new Promise(function(resolve, reject) {
    resolve(validation(rawEmailPayload));
  });
}
