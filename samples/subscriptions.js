/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/subscriptions.json', data)
    .then(function (subscriptions) {
      var promises = [];
      for (var index = 0; index < subscriptions.length; index++) {
        promises.push(Hoist.event.raise('subscription:found', subscriptions[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};