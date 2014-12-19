/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/transactions.json', data)
    .then(function (transactions) {
      var promises = [];
      for (var index = 0; index < transactions.length; index++) {
        promises.push(Hoist.event.raise('transaction:found', transactions[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};