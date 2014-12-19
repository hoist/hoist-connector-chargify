/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/subscriptions/1234567/components/22.json')
    .then(function (paymentProfile) {
      Hoist.event.raise('paymentProfile:created', subscription)
    })
  .then(done);
};