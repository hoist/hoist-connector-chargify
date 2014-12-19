/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/subscriptions/<sub_id>/components/<comp_id>/allocations.json')
    .then(function (allocations) {
      var promises = [];
      for (var index = 0; index < allocations.length; index++) {
        promises.push(Hoist.event.raise('allocation:found', allocations[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};