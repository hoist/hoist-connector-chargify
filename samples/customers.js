/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/customers/1234567.json')
    .then(function (customer) {
      Hoist.event.raise('customer:found', customer);
    })
  .then(done);
};