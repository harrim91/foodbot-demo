exports.handler = (event, context, callback) => {

  var request = require('request');
  var openFoodFactsAPIURL = 'http://world.openfoodfacts.org/api/v0/product/';

  var responseJSON = {
    "response": "",
    "continue": true,
    "customPayload": null,
    "quickReplies": null
  };

  request(`${openFoodFactsAPIURL}${event.customPayload}.json`, function(error, response, body) {
    var product = JSON.parse(body).product;
    if(product.nutriments.energy !== '') {
      responseJSON.response += `These have ${product.nutriments.energy}${product.nutriments.energy_unit} of energy per ${product.nutrition_data_per}. `;
    } else {
      responseJSON.response += `I can't find any information about that! `;
    }
    responseJSON.response += `Want to search again?`;
    responseJSON.quickReplies = ['Yes', 'No'];

    callback(null, responseJSON);
  });
};
