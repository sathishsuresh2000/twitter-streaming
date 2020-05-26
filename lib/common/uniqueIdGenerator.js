const uuid = require('uuid');

class UniqueIDGenerator {

  getTimeBasedId() {
    return uuid.v1();
  }

}
module.exports = UniqueIDGenerator;