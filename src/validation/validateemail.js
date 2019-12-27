const isEmailArrayContainMoreThanOneElement = emailAddresses => {
  return Array.isArray(emailAddresses) && emailAddresses.length > 0;
};

const isValidEmail = email => {
  var regExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExpression.test(String(email).toLowerCase());
};

const isValidEmailArray = emailAddresses => {
  for (let i = 0; i < emailAddresses.length; i++) {
    let element = emailAddresses[i];
    if (!isValidEmail(element)) {
      return false;
    }
  }
  return true;
};

const emailValidation = rawEmailPayload => {
  if (!isEmailArrayContainMoreThanOneElement(rawEmailPayload.toAddress) || !isValidEmailArray(rawEmailPayload.toAddress)){
    return false;
  } else if (isEmailArrayContainMoreThanOneElement(rawEmailPayload.ccAddress) && !isValidEmailArray(rawEmailPayload.ccAddress)){
    return false;
  } else if (isEmailArrayContainMoreThanOneElement(rawEmailPayload.bccAddress) && !isValidEmailArray(rawEmailPayload.bccAddress)){
    return false;
  } else {
    return true;
  }
};

export default function(emailPayload) {
  return emailValidation(emailPayload);
}
