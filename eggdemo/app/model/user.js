module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    userName: {
      type: String
    },
    password: {
      type: String
    },
    mobile: {
      type: String
    },
    email: {
      type: String
    },
    role_id: {
      type: Schema.Types.ObjectId
    },
    role: {
      type: String
    },
    add_time: {
      type: Number,
      default: new Date().getTime()
    },
    is_super: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 1
    }
  });
  return mongoose.model('User', UserSchema, 'user');
}
