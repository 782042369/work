'use strict';

const BaseController = require('./base');

class FocusController extends BaseController {
  async uploadimg() {
    try {
      const result = await this.service.uploadimg.uploadimg();
      this.success(1, '图片上传成功', result);
    } catch (error) {
      this.error(0, '管图片上传失败', error);
    }
  }
}

module.exports = FocusController;
