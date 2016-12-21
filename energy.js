exports.handler = (event, context, callback) => {

  var responseJSON = {
    "response": "",
    "continue": true,
    "customPayload": null,
    "quickReplies": null
  };

  var product = event.customPayload;
  console.log(product);

  if(product.nutriments.energy && product.nutriments.energy !== '') {
    responseJSON.response += `These have ${product.nutriments.energy}${product.nutriments.energy_unit} of energy per ${product.nutrition_data_per}. `;
  } else {
    responseJSON.response += `I can't find any information about that! `;
  }
  responseJSON.response += `Want to search again?`;
  responseJSON.quickReplies = ['Yes', 'No'];

  callback(null, responseJSON);
};
