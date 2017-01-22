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
    if(!product.ingredients_text_debug || product.ingredients_text_debug === '') {
      responseJSON.response += `I can't find any information about that! `;
    } else {
      responseJSON.response += `These contain ${product.ingredients_text_debug}`;
      if (product.image_ingredients_thumb_url) responseJSON.response += `<br/>Here's an image: [img]${product.image_ingredients_thumb_url}[/img]`;
    }
    responseJSON.response += `Want to search again?`;
    responseJSON.quickReplies = ['Yes', 'No'];

    callback(null, responseJSON);
  });
};
