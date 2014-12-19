/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/events.json')
    .then(function (events) {
      var promises = [];
      for (var index = 0; index < events.length; index++) {
        promises.push(Hoist.event.raise('event:found', events[index]));
      }
      return Hoist.promise.all(promises);
    })
  .then(done);
};