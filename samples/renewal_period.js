/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "subscription_id": "111111"
  };
  chargify.post('/subscriptions/1234567/renewals/preview.json ', data)
    .then(function (renewalPreview) {
      Hoist.event.raise('renewalPreview:created', renewalPreview)
    })
    .then(done);
};