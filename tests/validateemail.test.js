const {expect} = require('chai');
const config =  require('config');
const validation = require('../src/validation/validateemailrequest');

const emailValidationErrorMessage = "ToAddress needs to be an array of valid emails";
const contentAndSubjectValidationErrorMessage = "Content and subject needs value of type string";
const payloadValidationErrorMessage = "Send email payload can't be empty";


describe('Validation', ()=>{
    it('tests that if payload is null, validation failed with error', async() => {
        let emailRequest = null;
        let validationResult = await validation(emailRequest);
        expect(validationResult.isValid).to.equal(false);     
        expect(validationResult.error).to.equal(payloadValidationErrorMessage);
    });

    it('tests that if toAddress is not array, validation failed with error', async() => {
        let emailRequest = {
            toAddress: {}
        };
        let validationResult = await validation(emailRequest);
        expect(validationResult.isValid).to.equal(false);     
        expect(validationResult.error).to.equal(emailValidationErrorMessage);
    });
});
