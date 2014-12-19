/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "adjustment": {
      "amount": "4.00",
      "memo": "This is the description of an adjustment on a subscription that increases the balance by a certain dollar amount."
    }
  };
  chargify.post('/subscriptions/12345/adjustments.json', data)
    .then(function (adjustment) {
      Hoist.event.raise('adjustment:created', adjustment)
    })
    .then(done);
};