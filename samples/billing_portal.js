/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.get('/portal/customers/1234567/management_link.json')
    .then(function (managementLink) {
      Hoist.event.raise('management_link:found', managementLink);
    })
    .then(done);
};