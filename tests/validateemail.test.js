import {expect} from 'chai';
import validation from '../src/validation/validate_email';

const emailValidationErrorMessage =
  'Email addresses needs to be an array of valid emails';
const contentValidationErrorMessage = 'Content needs value of type string';
const subjectValidationErrorMessage = 'Subject needs value of type string';
const payloadValidationErrorMessage = "Send email payload can't be empty";

describe('Validation', () => {
  it('tests that if payload is null, validation failed with error', async() => {
    let emailRequest = null;
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(payloadValidationErrorMessage);
  });

  it('tests that if toAddress is empty array, validation failed with error', async() => {
    let emailRequest = {
      toAddress: [],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(emailValidationErrorMessage);
  });

  it('tests that if toAddress contains incorrect emails, validation failed with error', async() => {
    let emailRequest = {
      toAddress: ['test@test'],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(emailValidationErrorMessage);
  });

  it('tests that if ccAddress contains incorrect emails, validation failed with error', async() => {
    let emailRequest = {
      toAddress: ['test1@test.com', 'test2@test.com'],
      ccAddress: ['test.test.com'],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(emailValidationErrorMessage);
  });

  it('tests that if bccAddress contains incorrect emails, validation failed with error', async() => {
    let emailRequest = {
      toAddress: ['test1@test.com', 'test2@test.com'],
      ccAddress: ['test3@test.com', 'test4@test.com'],
      bccAddress: ['test.test.com'],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(emailValidationErrorMessage);
  });

  it('tests that if content is empty, validation failed with error', async() => {
    let emailRequest = {
      toAddress: ['test@test.com'],
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(contentValidationErrorMessage);
  });

  it('tests that if subject is empty, validation failed with error', async() => {
    let emailRequest = {
      toAddress: ['test@test.com'],
      content: 'test content',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(false);
    expect(validationResult.error).to.equal(subjectValidationErrorMessage);
  });

  it('tests that if ccAddress is undefined, validation passed and correct response returned', async() => {
    let emailRequest = {
      toAddress: ['test1@test.com', 'test2@test.com'],
      bccAddress: ['test5@test.com', 'test6@test.com'],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(true);
    expect(validationResult.error).to.equal(null);
    expect(validationResult.data.content).to.equal('test content');
    expect(validationResult.data.subject).to.equal('test subject');
    expect(validationResult.data.toAddress).to.equal(emailRequest.toAddress);
    expect(validationResult.data.bccAddress).to.equal(emailRequest.bccAddress);
  });

  it('tests that if valid payload provided, validation passed and correct response returned', async() => {
    let emailRequest = {
      toAddress: ['test1@test.com', 'test2@test.com'],
      ccAddress: ['test3@test.com', 'test4@test.com'],
      bccAddress: ['test5@test.com', 'test6@test.com'],
      content: 'test content',
      subject: 'test subject',
    };
    let validationResult = await validation(emailRequest);
    expect(validationResult.isValid).to.equal(true);
    expect(validationResult.error).to.equal(null);
    expect(validationResult.data.content).to.equal('test content');
    expect(validationResult.data.subject).to.equal('test subject');
    expect(validationResult.data.toAddress).to.equal(emailRequest.toAddress);
    expect(validationResult.data.ccAddress).to.equal(emailRequest.ccAddress);
    expect(validationResult.data.bccAddress).to.equal(emailRequest.bccAddress);
  });
});
