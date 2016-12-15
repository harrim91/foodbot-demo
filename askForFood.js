exports.handler = (event, context, respond) => {
  
  var request = require('request');

  /* "event" object contains payload from Motion AI
  {
    "from":"string", // the end-user's identifier (may be FB ID, email address, Slack username etc, depends on bot type)
    "session":"string", // a unique session identifier
    "botId":"string", // the Motion AI ID of the bot
    "botType":"string", // the type of bot this is (FB, Slack etc)
    "customPayload":"string", // a developer-defined payload for carrying information
    "reply":"string", // the end-user's reply that led to this module
    "moduleId":"string", // the current Motion AI Module ID
    "result":"string" // any extracted data from the prior module, if applicable
  }
  */


  // this is the object we will return to Motion AI in the callback
  var responseJSON = {
    "response": "", // what the bot will respond with (more is appended below)
    "continue": false, // denotes that Motion AI should hit this module again, rather than continue further in the flow
    "customPayload": "", // working data to examine in future calls to this function to keep track of state
    "quickReplies": null // a JSON object containing suggested/quick replies to display to the user
  }

  // API call to Open Trivia DB
  request(`http://world.openfoodfacts.org/api/v0/product/${event.reply}.json`, function(error, response, body) {

    var json = JSON.parse(body);

    responseJSON.response = `Ah, ${json.product.brands} ${json.product.generic_name}! These have ${json.product.nutriments.energy}${json.product.nutriments.energy_unit} of energy per ${json.product.nutrition_data_per}.`
    // return the data to Motion AI!
    respond(null, responseJSON);

  });
};

// define any functions used above
