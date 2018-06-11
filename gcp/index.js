var request = require("request");
var requestUrl = "https://example.com/replace-me";
var apiKeyField = "apiKey";
var apiKeyValue = "api_key_value";
var propertiesObject= new Object();
propertiesObject[apiKeyField] = apiKeyValue;

exports.gcpservice = (req, res) => {
  request({url:requestUrl, qs:propertiesObject}, function(err, response, body) {
    if(err) { 
      var errorData = {
        statusCode: response.statusCode,
        jobRunID: req.body.id,
        data: JSON.parse(body),
        status: "errored",
        error: err,
        pending: false
      }
      res.status(response.statusCode).send(JSON.parse(JSON.stringify(errorData)));
    }
    var returnData = {
      statusCode: response.statusCode,
      jobRunID: req.body.id,
      data: JSON.parse(body),
      status: "completed",
      error: null,
      pending: false
    }
    res.status(response.statusCode).send(JSON.parse(JSON.stringify(returnData)));
  });
};