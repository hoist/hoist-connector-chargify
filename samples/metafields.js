/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/1234567/metafields.json')
    .then(function (metafield) {
      Hoist.event.raise('metafield:found', metadata);
    })
  .then(done);
};