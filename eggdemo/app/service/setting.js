'use strict';

const Service = require('egg').Service;
class UploadimgService extends Service {
  async getsetting() {
    try {
      const result = this.ctx.model.Setting.find({});
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  async editsetting() {
    try {
      const {
        _id,
        site_logo
      } = this.ctx.request.body;
      let result = []
      if (_id) {
        if (site_logo.file) {
          console.log(1);
          this.ctx.request.body.site_logo = site_logo.file.response.data[0].saveDir
        } else {
          this.ctx.request.body.site_logo = site_logo
        }
        result = await this.ctx.model.Setting.updateOne({
          _id,
        }, {
          ...this.ctx.request.body
        });
      } else {
        const setting = new this.ctx.model.Setting(this.ctx.request.body);
        result = await setting.save();
      }
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}

module.exports = UploadimgService;
