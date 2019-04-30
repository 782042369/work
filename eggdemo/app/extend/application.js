const ObjectID = require('mongodb').ObjectID
module.exports = {
  getObjectID(param) {
    return ObjectID(param)
  }
}
