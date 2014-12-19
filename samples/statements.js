/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    "subscription_id": "111111"
  };
  chargify.post('/statements/ids.json', data)
    .then(function (statementIds) {
      var promises = [];
      for (var index = 0; index < statementIds.length; index++) {
        promises.push(Hoist.event.raise('statementId:found', statementIds[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};