/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/payment_profiles/1234567.json')
    .then(function (paymentProfile) {
      Hoist.event.raise('paymentProfile:found', subscription)
    })
  .then(done);
};