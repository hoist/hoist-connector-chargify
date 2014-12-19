/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "payment": {
      "amount": 10.00,
      "memo": "Client x paid with $10.00 of nickles"
    }
  };
  chargify.post('/subscriptions/1234567/payments.json', data)
    .then(function (payment) {
      Hoist.event.raise('payment:created', subscription)
    })
    .then(done);
};