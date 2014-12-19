/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/stats.json', data)
    .then(function (stats) {
      Hoist.event.raise('stats:found', stats);
    })
    .then(done);
};