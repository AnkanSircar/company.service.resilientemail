Resilient email service 
=======================
**This service accepts details from user to send an email. It has an abstraction to send emails based on two popular email services : mailgun and sendgrid. The reason two services involved is to ensure if one them goes down, can quickly fail over to the other service in order to ensure high availability.**

## Pre-requisites 

Please install the following components before hand to make sure the system is ready to run the app : 

* Node v10.13.0 or higher
* NPM v6.4.1 or higher
* VSCode or any other suitable editor 
* Postman v7.12.0 or higher 


## How to run 

* Run `npm install` in root directory to install dependent packages 
* Run `npm run test` to execute the unit tests 
* Run `npm run dev` to run the app 
* Navigate to a browser or postman app to run `http://localhost:3000/api/v1/heartbeat` to verify the app is responding 
* If want to get a quick understanding of how the app works, launch the postman app 
  * Import the collection `Company.Service.ResilientEmail.postman_collection.json` from `..\company.service.resilientemail\integrationtests`
  * Import the environment `Development.postman_environment.json` if want to run against the development environment 
  * Import the environment `localhost.postman_environment.json` if want to run against local instance 
