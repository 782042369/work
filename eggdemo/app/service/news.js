'use strict';

const Service = require('egg').Service;

class NesService extends Service {
  async getNewsList() {
    // curl 获取远程数据
    const api = this.config.url + 'appapi.php?a=getPortalList&catid=20&page=1';
    const res = await this.ctx.curl(api)
    // 返回16进制数据
    const data = JSON.parse(res.data);
    console.log('data: ', data);
    return data.result;
  }
  async getNewsContent() {
    // curl 获取远程数据
    const api = this.config.url + 'appapi.php?a=getPortalArticle&aid=' + this.ctx.query.aid;
    const res = await this.ctx.curl(api)
    // 返回16进制数据
    const data = JSON.parse(res.data);
    return data.result;
  }
}

module.exports = NesService;
