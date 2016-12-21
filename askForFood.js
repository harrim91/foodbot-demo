exports.handler = (event, context, callback) => {
  
  var request = require('request');
  var openFoodFactsAPIURL = 'http://world.openfoodfacts.org/api/v0/product/';

  var responseJSON = {
    "response": "",
    "continue": true,
    "customPayload": null,
    "quickReplies": null
  };

  request(`${openFoodFactsAPIURL}${event.reply}.json`, function(error, response, body) {

    var json = JSON.parse(body);
    
    if(error || json.status === '0' || json.product._id === '') {
        responseJSON.response = `Oops, I can't find that product, want to search again?`;
        responseJSON.quickReplies = ['Yes', 'No'];
    } else {
        responseJSON.customPayload = json.product;
        responseJSON.response = `Ah! `;
        if (json.product.generic_name && json.product.generic_name !== '') {
            if (json.product.brands && json.product.brands !== '') responseJSON.response += `${json.product.brands} `;
            responseJSON.response += `${json.product.generic_name}! `;
        }
        responseJSON.response += `What do you want to know about these?`;
        responseJSON.quickReplies = ['Energy', 'Ingredients'];
    }

    callback(null, responseJSON);

  });
};
