'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RoleAccessSchema = new Schema({
    access_id: {
      type: Schema.Types.Mixed,
      default: '',
    },
    role_id: {
      type: String,
    },
    pid: {
      type: Schema.Types.Mixed,
      default: '',
    },
    parent_id: {
      type: Schema.Types.Mixed,
      default: 0,
    },
    module_name: {
      type: String,
    },
    url: {
      type: String,
      default: '',
    },
    add_time: {
      type: Number,
      default: new Date().getTime(),
    },
  });
  return mongoose.model('RoleAccess', RoleAccessSchema, 'role_access');
};
