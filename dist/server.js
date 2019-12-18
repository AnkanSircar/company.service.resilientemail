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

/***/ "./src/external-api/mailgun_send_email.js":
/*!************************************************!*\
  !*** ./src/external-api/mailgun_send_email.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var request = __webpack_require__(/*! request */ \"request\");\n\nvar querystring = __webpack_require__(/*! querystring */ \"querystring\");\n\nvar config = __webpack_require__(/*! config */ \"config\");\n\nvar apikey = config.get('mailgun.apiKey');\nvar domainName = config.get('mailgun.domainName');\nvar apiUrl = \"https://api:\".concat(apikey, \"@api.mailgun.net/v3/\").concat(domainName, \"/messages\");\nvar sender = 'Unique App <ankan.sircar@gmail.com>';\n\nvar getEmailBody = function getEmailBody(mail) {\n  var emailBody = {};\n  emailBody.from = sender;\n  emailBody.subject = mail.subject;\n  emailBody.text = mail.content;\n  var toAddresses = [];\n  var ccAddresses = [];\n  var bccAddresses = [];\n  mail.toAddress.forEach(function (item) {\n    toAddresses.push(item);\n  });\n  emailBody.to = toAddresses.join(',');\n\n  if (mail.ccAddress.length != 0) {\n    mail.ccAddress.forEach(function (item) {\n      ccAddresses.push(item);\n    });\n    emailBody.cc = ccAddresses.join(',');\n  }\n\n  if (mail.bccAddress.length != 0) {\n    mail.bccAddress.forEach(function (item) {\n      bccAddresses.push(item);\n    });\n    emailBody.bcc = bccAddresses.join(',');\n  }\n\n  return querystring.stringify(emailBody);\n};\n\nmodule.exports = function (mailDetails) {\n  return new Promise(function (resolve, reject) {\n    request({\n      rejectUnauthorized: false,\n      headers: {\n        'Content-Type': 'application/x-www-form-urlencoded'\n      },\n      uri: apiUrl,\n      body: getEmailBody(mailDetails),\n      method: 'POST'\n    }, function (err, res, body) {\n      if (!err && res.statusCode === 200) {\n        console.log(\"Mailgun request successful. Details : \".concat(body));\n        resolve(true);\n      } else {\n        console.log(\"Mailgun request failed with error : \".concat(res.statusCode, \" \").concat(res.body));\n        resolve(false);\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/external-api/mailgun_send_email.js?");

/***/ }),

/***/ "./src/external-api/sendgrid_send_email.js":
/*!*************************************************!*\
  !*** ./src/external-api/sendgrid_send_email.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var request = __webpack_require__(/*! request */ \"request\");\n\nvar config = __webpack_require__(/*! config */ \"config\");\n\nvar apiUrl = config.get('sendgrid.apiUrl');\nvar apiKey = config.get('sendgrid.apiKey');\nvar senderEmail = 'ankan.sircar@gmail.com';\nvar senderName = 'Unique App';\n\nvar getEmailBody = function getEmailBody(mail) {\n  var requestSendMail = {};\n  var personalization = {};\n  var to = [];\n  var cc = [];\n  var bcc = [];\n  mail.toAddress.forEach(function (item) {\n    to.push({\n      \"email\": item\n    });\n  });\n  personalization.to = to;\n  personalization.subject = mail.subject;\n\n  if (mail.ccAddress.length != 0) {\n    mail.ccAddress.forEach(function (item) {\n      cc.push({\n        \"email\": item\n      });\n    });\n    personalization.cc = cc;\n  }\n\n  if (mail.bccAddress.length != 0) {\n    mail.bccAddress.forEach(function (item) {\n      bcc.push({\n        \"email\": item\n      });\n    });\n    personalization.bcc = bcc;\n  }\n\n  var personalizations = [];\n  personalizations.push(personalization);\n  var content = [];\n  content.push({\n    \"type\": \"text/plain\",\n    \"value\": mail.content\n  });\n  requestSendMail.personalizations = personalizations;\n  requestSendMail.content = content;\n  requestSendMail.from = {\n    \"email\": senderEmail,\n    \"name\": senderName\n  };\n  return JSON.stringify(requestSendMail);\n};\n\nmodule.exports = function (mailDetails) {\n  return new Promise(function (resolve, reject) {\n    request({\n      rejectUnauthorized: false,\n      headers: {\n        'Content-Type': 'application/json',\n        'authorization': 'Bearer ' + apiKey\n      },\n      uri: apiUrl,\n      body: getEmailBody(mailDetails),\n      method: 'POST'\n    }, function (err, res, body) {\n      if (!err && res.statusCode === 202) {\n        console.log(\"Sendgrid request successful. Details : \".concat(JSON.stringify(res)));\n        resolve(true);\n      } else {\n        console.log(\"Sendgrid request failed with error : \".concat(err, \" \").concat(JSON.stringify(res)));\n        resolve(false);\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/external-api/sendgrid_send_email.js?");

/***/ }),

/***/ "./src/routes/heartbeat.js":
/*!*********************************!*\
  !*** ./src/routes/heartbeat.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\nrouter.get('/heartbeat', function (req, res) {\n  var statusCode = 200;\n  var statusDetails = 'heartbeat is ok';\n  res.status(statusCode).send({\n    statusCode: statusCode,\n    statusDetails: statusDetails\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/heartbeat.js?");

/***/ }),

/***/ "./src/routes/sendemail.js":
/*!*********************************!*\
  !*** ./src/routes/sendemail.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar validateemailrequest = __webpack_require__(/*! ../validation/validate_email */ \"./src/validation/validate_email.js\");\n\nvar mailgun_send_email = __webpack_require__(/*! ../external-api/mailgun_send_email */ \"./src/external-api/mailgun_send_email.js\");\n\nvar sendgrid_send_email = __webpack_require__(/*! ../external-api/sendgrid_send_email */ \"./src/external-api/sendgrid_send_email.js\");\n\nvar router = express.Router();\nrouter.post('/sendemail', function _callee(req, res) {\n  var emailRequest, validationResult, statusCode, statusDetails, mailgunResponse, _statusCode, _statusDetails, sendgridResponse, _statusCode2, _statusDetails2, _statusCode3, _statusDetails3;\n\n  return regeneratorRuntime.async(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          emailRequest = req.body;\n          _context.next = 3;\n          return regeneratorRuntime.awrap(validateemailrequest(emailRequest));\n\n        case 3:\n          validationResult = _context.sent;\n\n          if (validationResult.isValid) {\n            _context.next = 10;\n            break;\n          }\n\n          statusCode = 400;\n          statusDetails = validationResult.error;\n          res.status(statusCode).send({\n            statusCode: statusCode,\n            statusDetails: statusDetails\n          });\n          _context.next = 14;\n          break;\n\n        case 10:\n          _context.next = 12;\n          return regeneratorRuntime.awrap(mailgun_send_email(validationResult.data));\n\n        case 12:\n          mailgunResponse = _context.sent;\n\n          if (mailgunResponse) {\n            _statusCode = 202;\n            _statusDetails = 'Send email request successfully accepted.';\n            res.status(_statusCode).send({\n              statusCode: _statusCode,\n              statusDetails: _statusDetails\n            });\n          } else {\n            sendgridResponse = sendgrid_send_email(emailRequest);\n\n            if (sendgridResponse) {\n              _statusCode2 = 202;\n              _statusDetails2 = 'Send email request successfully accepted.';\n              res.status(_statusCode2).send({\n                statusCode: _statusCode2,\n                statusDetails: _statusDetails2\n              });\n            } else {\n              _statusCode3 = 503;\n              _statusDetails3 = 'Sorry email service is not available at the moment. Please try again later.';\n              res.status(_statusCode3).send({\n                statusCode: _statusCode3,\n                statusDetails: _statusDetails3\n              });\n            }\n          }\n\n        case 14:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/sendemail.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n// const express = require('express');\n\n\nvar bodyparser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar config = __webpack_require__(/*! config */ \"config\");\n\nvar heartbeatRouter = __webpack_require__(/*! ../routes/heartbeat */ \"./src/routes/heartbeat.js\");\n\nvar sendemailRouter = __webpack_require__(/*! ../routes/sendemail */ \"./src/routes/sendemail.js\");\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar port = config.get('port');\napp.use(bodyparser.json());\napp.use(bodyparser.urlencoded({\n  extended: false\n}));\napp.use('/api/v1/', heartbeatRouter);\napp.use('/api/v1/', sendemailRouter);\nvar listen = app.listen(port, function () {\n  console.log(\"app is listening on port \".concat(port));\n}); // module.exports = app;\n// module.exports.port = listen.address().port;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  app: app,\n  port: listen.address().port\n});\n\n//# sourceURL=webpack:///./src/server/server-dev.js?");

/***/ }),

/***/ "./src/validation/validate_email.js":
/*!******************************************!*\
  !*** ./src/validation/validate_email.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var emailValidationErrorMessage = \"Email addresses needs to be an array of valid emails\";\nvar contentValidationErrorMessage = \"Content needs value of type string\";\nvar subjectValidationErrorMessage = \"Subject needs value of type string\";\nvar payloadValidationErrorMessage = \"Send email payload can't be empty\";\n\nvar isEmpty = function isEmpty(value) {\n  return value === undefined || value === null || value.length <= 0 ? true : false;\n};\n\nvar isValidEmail = function isValidEmail(email) {\n  var regExpression = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n  return regExpression.test(String(email).toLowerCase());\n};\n\nvar isValidEmailArray = function isValidEmailArray(emailAddresses) {\n  return Array.isArray(emailAddresses) && emailAddresses.length > 0;\n};\n\nvar errorMessage = function errorMessage(message) {\n  return {\n    \"isValid\": false,\n    \"data\": null,\n    \"error\": message\n  };\n};\n\nvar getSanitizedData = function getSanitizedData(payload) {\n  return {\n    \"toAddress\": payload.toAddress,\n    \"ccAddress\": isValidEmailArray(payload.ccAddress) ? payload.ccAddress : [],\n    \"bccAddress\": isValidEmailArray(payload.bccAddress) ? payload.bccAddress : [],\n    \"content\": payload.content,\n    \"subject\": payload.subject\n  };\n};\n\nvar validMessage = function validMessage(message) {\n  return {\n    \"isValid\": true,\n    \"data\": getSanitizedData(message),\n    \"error\": null\n  };\n};\n\nvar emailArrayValidation = function emailArrayValidation(emailAddresses) {\n  for (var i = 0; i < emailAddresses.length; i++) {\n    var element = emailAddresses[i];\n\n    if (!isValidEmail(element)) {\n      return false;\n    }\n  }\n\n  return true;\n};\n\nvar validation = function validation(rawEmailPayload) {\n  return isEmpty(rawEmailPayload) ? errorMessage(payloadValidationErrorMessage) : isEmpty(rawEmailPayload.content) ? errorMessage(contentValidationErrorMessage) : isEmpty(rawEmailPayload.subject) ? errorMessage(subjectValidationErrorMessage) : !isValidEmailArray(rawEmailPayload.toAddress) || !emailArrayValidation(rawEmailPayload.toAddress) ? errorMessage(emailValidationErrorMessage) : isValidEmailArray(rawEmailPayload.ccAddress) && !emailArrayValidation(rawEmailPayload.ccAddress) ? errorMessage(emailValidationErrorMessage) : isValidEmailArray(rawEmailPayload.bccAddress) && !emailArrayValidation(rawEmailPayload.bccAddress) ? errorMessage(emailValidationErrorMessage) : validMessage(rawEmailPayload);\n};\n\nmodule.exports = function (rawEmailPayload) {\n  return new Promise(function (resolve, reject) {\n    resolve(validation(rawEmailPayload));\n  });\n};\n\n//# sourceURL=webpack:///./src/validation/validate_email.js?");

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