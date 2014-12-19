/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  var data = {
    codes: ["15OFF", "20OFF", "50 OFF"]
  };
  chargify.put('/coupons/1234567/codes.json', data)
    .then(function (coupons) {
      var promises = [];
      for (var index = 0; index < coupons.length; index++) {
        promises.push(Hoist.event.raise('coupon:updated', coupons[index]));
      }
      return Hoist.promise.all(promises);
    })
    .then(done);
};