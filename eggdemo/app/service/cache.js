'use strict';

const Service = require('egg').Service;
class CacheService extends Service {
  async set(key, value, seconds) {
    const valuearr = JSON.stringify(value)
    if (this.app.redis) {
      if (seconds) {
        this.app.redis.set(key, valuearr, 'EX', seconds);
      } else {
        this.app.redis.set(key, valuearr);
      }
    }
    return
  }
  async get(key) {
    const data = await this.app.redis.get(key);
    if (this.app.redis && data) {
      return JSON.parse(data)
    }
    return
  }
}

module.exports = CacheService;
