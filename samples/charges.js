/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "charge": {
      "amount": "1.00",
      "memo": "This is the description of the one time charge."
    }
  };
  chargify.post('/subscriptions/1234567/charges.json')
    .then(function (charge) {
      Hoist.event.raise('charge:created', charge);
    })
    .then(done);
};