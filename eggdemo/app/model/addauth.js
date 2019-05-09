'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoleAccessSchema = new Schema({
    access_id: {
      type: String
    },
    role_id: {
      type: String,
    },
    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('RoleAccess', RoleAccessSchema, 'role_access');
};
