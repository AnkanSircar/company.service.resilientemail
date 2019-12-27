Resilient email service 
=======================

This service accepts details from user to send an email. It has an abstraction to send emails based on two popular email services : mailgun and sendgrid. The reason two services involved is to ensure if one them goes down, can quickly fail over to the other service in order to ensure high availability.

## API Contract 

This application contains the following two endpoinst for now. More can be added later. 

| Endpoint | Http verb | Sample Request | Sample Response |
| :---: | :---: | :---: | :---: |
| /heartbeat | GET | n/a  | {"statusCode": 200, "statusDetails": "heartbeat is ok"} |
| /sendemail | POST | {"toAddress": "test1@test.com", "subject": "this is a test subject", "content": "this is a test content"}| {"statusCode": 202, "statusDetails": "Send email request successfully accepted."} |

Valid status codes for this app :  

* 202 - Accepted the request and will be settled later
* 400 - Bad request due to validation errors 
* 503 - Service unavailable. Appears when both service fails to send emails.

## Pre-requisites 

Please install the following components beforehand to make sure local system is ready to run the app. 

* Node v10.13.0 or higher
* NPM v6.4.1 or higher
* VSCode or any other suitable editor 
* Postman v7.12.0 or higher 


## How to run 

* Run `npm install` in root directory to install dependent packages 
* Update the config `default.json` with relevant API key, domain name and url. A separate communication on that should happen already. 
* Run `npm run test` to execute the eslint and unit tests 
* Run `npm run builddev` to build the app in `development` mode or 
* Run `npm run buildprod` to build the app in `production` mode
* Run `npm run start` to run the app 
* Navigate to a browser or postman app to run `http://localhost:3000/api/v1/heartbeat` to verify the app is responding 
* If want to get a quick understanding of how the app works, launch the postman app 
  * Import the collection `company.service.resilientemail.postman_collection.json` from `..\company.service.resilientemail\integrationtests`
  * Import the environment `development.postman_environment.json` if want to run against the development environment 
  * Import the environment `localhost.postman_environment.json` if want to run against local instance 
  
  
 ## Whats missing to make it production ready 
  
 * Even though unit tests been included as part of the code, more tests need to be written to have better code coverage. 
 * Validation error messages can be more use friendly. Also centralized error message will improve code quality. 
 * More test coverage in integration testing need to be ensured. 
 * At the moment code is hosted in aws in serverless fashion, need to use some framework e.x. serverless to ensure code runs the same way in an environment as it runs locally. 
 * Authentication needs to thought through, planned to use API key to act as a first line of defense.
  
 ## Technology choices 
  
 * NodeJS been chosen to run the backend, as its light weight, event driven and efficient. 
 * Mocha is used as a test framework 
 * Config is used to control the application configuration in a more modular way
 * Webpack to bundle the code 
 * Babel been used to transpile so that latest ecma script version can be used 
