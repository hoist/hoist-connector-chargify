/* Just copy and paste this snippet into your code */

module.exports = function (event, done) {

  var chargify = Hoist.connector('<key>');
  chargify.delete('/coupons/123456.json')
    .then(function (coupon) {
      Hoist.event.raise('coupon:deleted', coupon)
    })
    .then(done);
};