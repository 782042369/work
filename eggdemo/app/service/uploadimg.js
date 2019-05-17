'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const pump = require('pump');


class UploadimgService extends Service {
  async uploadimg() {
    try {
      const result = [];
      let stream;
      const parts = await this.ctx.multipart({
        autoFields: true, // 提出除了文件的图片
      }); // 表单提交数据 多个个文件
      while ((stream = await parts()) != null) {
        if (!stream.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          break;
        }
        const {
          uploadDir, // 文件存放路径
          saveDir, // 数据库存放地址
        } = await this.service.tools.getuploadfile(stream.filename);
        const writestream = fs.createWriteStream(uploadDir);
        await pump(stream, writestream);
        result.push({
          uploadDir,
          saveDir,
        });
      }
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
}

module.exports = UploadimgService;
