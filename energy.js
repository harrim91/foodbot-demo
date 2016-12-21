var promise = require('q');

exports.handler = (event, context, callback) => {

  var responseJSON = {
    "response": "",
    "continue": true,
    "customPayload": "",
    "quickReplies": null
  }

  setResponse(event.customPayload, responseJSON)
    .then(function() {
      callback(null, responseJSON);
    })
    .done();
};

function setResponse(data, responseJSON) {
  return promise.fcall(function(data, responseJSON) {
    if(data.product.nutriments.energy && data.product.nutriments.energy !== '') {
      responseJSON.response += `These have ${data.product.nutriments.energy}${data.product.nutriments.energy_unit} of energy per ${data.product.nutrition_data_per}. `;
    } else {
        responseJSON.response += `I can't find any information about that! `;
    }
    responseJSON.response += `Want to search again?`;
    responseJSON.quickReplies = ['Yes', 'No'];
  });
}