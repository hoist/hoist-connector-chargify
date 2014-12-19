/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/invoices.json')
    .then(function (invoices) {
      var promises = [];
      for (var index = 0; index < invoices.length; index++) {
        promises.push(Hoist.event.raise('event:found', invoices[index]));
      }
      return Hoist.promise.all(promises);
    })
  .then(done);
};