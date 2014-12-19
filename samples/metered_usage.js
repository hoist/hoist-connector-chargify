/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/subscriptions/1234567/components/22.json')
    .then(function (usageCollection) {
      var promises = [];
      for (var index = 0; index < usageCollection.length; index++) {
        promises.push(Hoist.event.raise('usage:found', usageCollection[index]));
      }
      return Hoist.promise.all(promises);
    })
  .then(done);
};