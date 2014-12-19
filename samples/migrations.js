/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "migration": {
      "product_id": [@products.last.id]
    }
  };
  chargify.post('/subscriptions/1234567/migrations.json', data)
    .then(function (subscription) {
      Hoist.event.raise('subscription:migrated', subscription)
    })
    .then(done);
};