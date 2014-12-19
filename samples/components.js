/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/product_families/123456/components.json')
    .then(function (components) {
      var promises = [];
      for (var index = 0; index < components.length; index++) {
        promises.push(Hoist.event.raise('component:found', components[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};