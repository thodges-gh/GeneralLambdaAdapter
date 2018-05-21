var request = require("request");
var requestUrl = process.env.URL;
var apiKeyField = process.env.API_KEY_FIELD;
var apiKeyValue = process.env.API_KEY_VALUE;
var propertiesObject= new Object();
propertiesObject[apiKeyField] = apiKeyValue;

exports.handler = (event, context, callback) => {
  request({url:requestUrl, qs:propertiesObject}, function(err, response, body) {
    if(err) { 
      var errorData = {
        statusCode: response.statusCode,
        jobRunID: event["id"],
        data: JSON.parse(body),
        status: "errored",
        error: err,
        pending: false
      }
      callback(JSON.parse(JSON.stringify(errorData)) , null);
    }
    var returnData = {
      statusCode: response.statusCode,
      jobRunID: event["id"],
      data: JSON.parse(body),
      status: "completed",
      error: null,
      pending: false
    }
    callback(null, JSON.parse(JSON.stringify(returnData)));
  });
};