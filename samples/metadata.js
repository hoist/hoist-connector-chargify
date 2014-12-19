/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/1234567/metadata.json')
    .then(function (metadata) {
      Hoist.event.raise('metadata:found', metadata);
    })
  .then(done);
};