/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server-dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/external-api/mailgun-sendemail.js":
/*!***********************************************!*\
  !*** ./src/external-api/mailgun-sendemail.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! request */ \"request\");\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(request__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! querystring */ \"querystring\");\n/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst apikey = config__WEBPACK_IMPORTED_MODULE_2___default.a.get('mailgun.apiKey');\nconst domainName = config__WEBPACK_IMPORTED_MODULE_2___default.a.get('mailgun.domainName');\nconst apiUrl = `https://api:${apikey}@api.mailgun.net/v3/${domainName}/messages`;\nconst sender = 'Unique App <ankan.sircar@gmail.com>';\n\nconst getEmailBody = mail => {\n  let emailBody = {};\n  emailBody.from = sender;\n  emailBody.subject = mail.subject;\n  emailBody.text = mail.content;\n  let toAddresses = [];\n  let ccAddresses = [];\n  let bccAddresses = [];\n  mail.toAddress.forEach(item => {\n    toAddresses.push(item);\n  });\n  emailBody.to = toAddresses.join(',');\n\n  if (mail.ccAddress.length !== 0) {\n    mail.ccAddress.forEach(item => {\n      ccAddresses.push(item);\n    });\n    emailBody.cc = ccAddresses.join(',');\n  }\n\n  if (mail.bccAddress.length !== 0) {\n    mail.bccAddress.forEach(item => {\n      bccAddresses.push(item);\n    });\n    emailBody.bcc = bccAddresses.join(',');\n  }\n\n  return querystring__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(emailBody);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (mailDetails) {\n  if (!apikey) {\n    return Promise.reject(new Error(\"Missing api key.\"));\n  }\n\n  return new Promise((resolve, reject) => {\n    request__WEBPACK_IMPORTED_MODULE_0___default()({\n      rejectUnauthorized: false,\n      headers: {\n        'Content-Type': 'application/x-www-form-urlencoded'\n      },\n      uri: apiUrl,\n      body: getEmailBody(mailDetails),\n      method: 'POST'\n    }, (err, res, body) => {\n      console.log(`Error from mailgun ${err} ${JSON.stringify(res)}`);\n\n      if (!err && res.statusCode === 200) {\n        resolve(true);\n      } else {\n        reject(new Error(\"Mailgun failed to send email.\"));\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/external-api/mailgun-sendemail.js?");

/***/ }),

/***/ "./src/external-api/sendgrid-sendemail.js":
/*!************************************************!*\
  !*** ./src/external-api/sendgrid-sendemail.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! request */ \"request\");\n/* harmony import */ var request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(request__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst apiUrl = config__WEBPACK_IMPORTED_MODULE_1___default.a.get('sendgrid.apiUrl');\nconst apiKey = config__WEBPACK_IMPORTED_MODULE_1___default.a.get('sendgrid.apiKey');\nconst senderEmail = 'ankan.sircar@gmail.com';\nconst senderName = 'Unique App';\n\nconst getEmailBody = mail => {\n  let requestSendMail = {};\n  let personalization = {};\n  let to = [];\n  let cc = [];\n  let bcc = [];\n  mail.toAddress.forEach(item => {\n    to.push({\n      email: item\n    });\n  });\n  personalization.to = to;\n  personalization.subject = mail.subject;\n\n  if (mail.ccAddress.length !== 0) {\n    mail.ccAddress.forEach(item => {\n      cc.push({\n        email: item\n      });\n    });\n    personalization.cc = cc;\n  }\n\n  if (mail.bccAddress.length !== 0) {\n    mail.bccAddress.forEach(item => {\n      bcc.push({\n        email: item\n      });\n    });\n    personalization.bcc = bcc;\n  }\n\n  let personalizations = [];\n  personalizations.push(personalization);\n  let content = [];\n  content.push({\n    type: 'text/plain',\n    value: mail.content\n  });\n  requestSendMail.personalizations = personalizations;\n  requestSendMail.content = content;\n  requestSendMail.from = {\n    email: senderEmail,\n    name: senderName\n  };\n  return JSON.stringify(requestSendMail);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (mailDetails) {\n  return new Promise((resolve, reject) => {\n    request__WEBPACK_IMPORTED_MODULE_0___default()({\n      rejectUnauthorized: false,\n      headers: {\n        'Content-Type': 'application/json',\n        authorization: 'Bearer ' + apiKey\n      },\n      uri: apiUrl,\n      body: getEmailBody(mailDetails),\n      method: 'POST'\n    }, (err, res, body) => {\n      console.log(`Error from sendgrid ${err} ${JSON.stringify(res)}`);\n\n      if (!err && res.statusCode === 202) {\n        resolve(true);\n      } else {\n        // resolve(false);\n        reject(new Error(\"Sendgrid failed to send email.\"));\n      }\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/external-api/sendgrid-sendemail.js?");

/***/ }),

/***/ "./src/routes/heartbeat.js":
/*!*********************************!*\
  !*** ./src/routes/heartbeat.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nrouter.get('/heartbeat', (req, res) => {\n  let statusCode = 200;\n  let statusDetails = 'heartbeat is ok';\n  res.status(statusCode).send({\n    statusCode,\n    statusDetails\n  });\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/heartbeat.js?");

/***/ }),

/***/ "./src/routes/sendemail.js":
/*!*********************************!*\
  !*** ./src/routes/sendemail.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _validation_validateemail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation/validateemail */ \"./src/validation/validateemail.js\");\n/* harmony import */ var _external_api_mailgun_sendemail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../external-api/mailgun-sendemail */ \"./src/external-api/mailgun-sendemail.js\");\n/* harmony import */ var _external_api_sendgrid_sendemail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../external-api/sendgrid-sendemail */ \"./src/external-api/sendgrid-sendemail.js\");\n\n\n\n\nconst router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();\nconst badRequestStatusCode = 400;\nconst acceptedStatusCode = 202;\nconst serviceUnavailableStatusCode = 503;\nconst successStatusDetails = 'Send email request successfully accepted.';\nconst serviceUnavailableStatusDetails = 'Sorry email service is not available at the moment. Please try again later.';\n\nconst sendEmail = async data => {\n  try {\n    let mailgunResponse = await Object(_external_api_mailgun_sendemail__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(data);\n    console.log(`Response from mailgun ${mailgunResponse}`);\n  } catch (error) {\n    console.log(`Error Response from mailgun ${error}`);\n    let sendgridResponse = await Object(_external_api_sendgrid_sendemail__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(data);\n    console.log(`Response from sendgrid ${sendgridResponse}`);\n  }\n};\n\nrouter.post('/sendemail', async (req, res) => {\n  const emailRequest = req.body;\n  let validationResult = await Object(_validation_validateemail__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(emailRequest);\n\n  if (!validationResult.isValid) {\n    let statusDetails = validationResult.error;\n    res.status(badRequestStatusCode).send({\n      statusCode: badRequestStatusCode,\n      statusDetails\n    });\n  } else {\n    try {\n      await sendEmail(validationResult.data);\n      res.status(acceptedStatusCode).send({\n        statusCode: acceptedStatusCode,\n        statusDetails: successStatusDetails\n      });\n    } catch (error) {\n      res.status(serviceUnavailableStatusCode).send({\n        statusCode: serviceUnavailableStatusCode,\n        statusDetails: serviceUnavailableStatusDetails\n      });\n    }\n  }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/routes/sendemail.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! config */ \"config\");\n/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(config__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _routes_heartbeat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../routes/heartbeat */ \"./src/routes/heartbeat.js\");\n/* harmony import */ var _routes_sendemail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../routes/sendemail */ \"./src/routes/sendemail.js\");\n\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nconst port = config__WEBPACK_IMPORTED_MODULE_2___default.a.get('port');\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_1___default.a.urlencoded({\n  extended: false\n}));\napp.use('/api/v1/', _routes_heartbeat__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\napp.use('/api/v1/', _routes_sendemail__WEBPACK_IMPORTED_MODULE_4__[\"default\"]);\nconst listen = app.listen(port, () => {\n  console.log(`app is listening on port ${port}`); // eslint-disable-line no-undef\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  app,\n  port: listen.address().port\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./src/validation/validateemail.js":
/*!*****************************************!*\
  !*** ./src/validation/validateemail.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst emailValidationErrorMessage = 'Email addresses needs to be an array of valid emails';\nconst contentValidationErrorMessage = 'Content needs value of type string';\nconst subjectValidationErrorMessage = 'Subject needs value of type string';\nconst payloadValidationErrorMessage = \"Send email payload can't be empty\";\n\nconst isEmpty = value => !!(value === undefined || value === null || value.length <= 0);\n\nconst isValidEmail = email => {\n  var regExpression = /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n  return regExpression.test(String(email).toLowerCase());\n};\n\nconst isValidEmailArray = emailAddresses => {\n  return Array.isArray(emailAddresses) && emailAddresses.length > 0;\n};\n\nconst errorMessage = message => ({\n  isValid: false,\n  data: null,\n  error: message\n});\n\nconst getSanitizedData = payload => {\n  return {\n    toAddress: payload.toAddress,\n    ccAddress: isValidEmailArray(payload.ccAddress) ? payload.ccAddress : [],\n    bccAddress: isValidEmailArray(payload.bccAddress) ? payload.bccAddress : [],\n    content: payload.content,\n    subject: payload.subject\n  };\n};\n\nconst validMessage = message => ({\n  isValid: true,\n  data: getSanitizedData(message),\n  error: null\n});\n\nconst emailArrayValidation = emailAddresses => {\n  for (let i = 0; i < emailAddresses.length; i++) {\n    let element = emailAddresses[i];\n\n    if (!isValidEmail(element)) {\n      return false;\n    }\n  }\n\n  return true;\n};\n\nconst validation = rawEmailPayload => isEmpty(rawEmailPayload) ? errorMessage(payloadValidationErrorMessage) : isEmpty(rawEmailPayload.content) ? errorMessage(contentValidationErrorMessage) : isEmpty(rawEmailPayload.subject) ? errorMessage(subjectValidationErrorMessage) : !isValidEmailArray(rawEmailPayload.toAddress) || !emailArrayValidation(rawEmailPayload.toAddress) ? errorMessage(emailValidationErrorMessage) : isValidEmailArray(rawEmailPayload.ccAddress) && !emailArrayValidation(rawEmailPayload.ccAddress) ? errorMessage(emailValidationErrorMessage) : isValidEmailArray(rawEmailPayload.bccAddress) && !emailArrayValidation(rawEmailPayload.bccAddress) ? errorMessage(emailValidationErrorMessage) : validMessage(rawEmailPayload);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (rawEmailPayload) {\n  return new Promise(function (resolve, reject) {\n    resolve(validation(rawEmailPayload));\n  });\n});\n\n//# sourceURL=webpack:///./src/validation/validateemail.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"querystring\");\n\n//# sourceURL=webpack:///external_%22querystring%22?");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"request\");\n\n//# sourceURL=webpack:///external_%22request%22?");

/***/ })

/******/ });