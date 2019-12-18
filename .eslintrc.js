module.exports = {
    "extends": [
      "eslint:recommended",
      "strongloop"
    ],
    "rules": {
      "max-len": [2, 180, 8]
    },
    "env": {
      "commonjs": true,
      "node": true,
      "mocha": true,
      "es6": true
    },
    "parser": "babel-eslint"
  };