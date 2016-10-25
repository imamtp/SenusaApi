/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
   name: { type: 'string' },
   password: { type: 'string' },
   phone: { type: 'string' },
   address: { type: 'string' },
   email: { type: 'string' }
 },
 signup: function (inputs, cb) {
   // Create a user
   User.create({
     name: inputs.name,
     phone: inputs.phone,
     password: inputs.password,
     address: inputs.address,
     email: inputs.email
   })
   .exec(cb);
 },
 attemptLogin: function (inputs, cb) {
   //user Check
  //  User.findOne({
  //    mobileNumber: inputs.mobileNumber,
  //    password: inputs.password
  //  })
  //  .exec(cb);

  //  User.query({
  //     text: 'SELECT mobileNumber FROM user WHERE user.mobileNumber = $1 and user.password = $2',
  //     values: [ inputs.mobileNumber , inputs.password]
  //   }, function(err, results) {
  //   if (err) return res.serverError(err);
  //   return res.ok(results.rows);
  // });

 }

};
