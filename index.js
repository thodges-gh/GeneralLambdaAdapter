var request = require("request");
var requestUrl = process.env.URL;
var apiKeyField = process.env.API_KEY_FIELD;
var apiKeyValue = process.env.API_KEY_VALUE;
var propertiesObject= new Object();
propertiesObject[apiKeyField] = apiKeyValue;

exports.handler = (event, context, callback) => {
  request({url:requestUrl, qs:propertiesObject}, function(err, response, body) {
    if(err) { callback(err, null); }
    callback(null, { statusCode: 200, body: body });
  });
};