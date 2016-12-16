exports.handler = (event, context, callback) => {
  
  var request = require('request');
  var openFoodFactsAPIURL = 'http://world.openfoodfacts.org/api/v0/product/';

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
    "continue": true, // denotes that Motion AI should hit this module again, rather than continue further in the flow
    "customPayload": "", // working data to examine in future calls to this function to keep track of state
    "quickReplies": ['Yes', 'No'] // a JSON object containing suggested/quick replies to display to the user
  }

  // API call to Open Trivia DB
  request(`${openFoodFactsAPIURL}${event.reply}.json`, function(error, response, body) {

    var json = JSON.parse(body);
    
    if(error || json.status === '0' || json.product._id === '') {
        responseJSON.response = `Oops, I can't find that product, want to search again?`;
    } else {
        responseJSON.response = `Ah! `;
        if (json.product.generic_name && json.product.generic_name !== '') {
            if (json.product.brands && json.product.brands !== '') responseJSON.response += `${json.product.brands} `;
            responseJSON.response += `${json.product.generic_name}! `;
        }
        if(json.product.nutriments.energy && json.product.nutriments.energy !== '') {
            responseJSON.response += `These have ${json.product.nutriments.energy}${json.product.nutriments.energy_unit} of energy per ${json.product.nutrition_data_per}. `;
        } else {
            responseJSON.response += `I can't find any information about that! `;
        }
        responseJSON.response += `Want to search again?`;
        
    }
    // return the data to Motion AI!
    callback(null, responseJSON);

  });
};

// define any functions used above
