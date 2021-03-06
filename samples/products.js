/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/products.json')
    .then(function (products) {
      var promises = [];
      for (var index = 0; index < products.length; index++) {
        promises.push(Hoist.event.raise('product:found', products[index]));
      }
      return Hoist.promise.all(promises);
    })
  .then(done);
};