/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "amount": 10.00,
    "memo": "Client x refunded with $10.00 of nickles"
  };
  chargify.post('/subscriptions/1234567/refunds.json', data)
    .then(function (refund) {
      Hoist.event.raise('refund:created', refund)
    })
    .then(done);
};