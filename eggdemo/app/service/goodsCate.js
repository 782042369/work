'use strict';

const Service = require('egg').Service;
const path = require('path');
class GoodsCateService extends Service {
  async find() {
    try {
      let result = [];
      if (this.ctx.request.body.pid || this.ctx.request.body._id) {
        result = await this.ctx.model.GoodsCate.find(this.ctx.request.body);
      } else {
        result = await this.ctx.model.GoodsCate.aggregate([{
            $lookup: {
              from: 'goods_cate',
              localField: '_id',
              foreignField: 'pid',
              as: 'items',
            },
          },
          {
            $match: {
              pid: 0,
            },
          },
        ]);
      }
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 增加
  async addgoodsattribute() {
    const {
      title,
      pid,
    } = this.ctx.request.body;
    let result = '';
    result = await this.ctx.model.GoodsCate.find({
      title,
    });
    if (result.length === 0) {
      const {
        saveDir,
        uploadDir
      } = this.ctx.request.body.cate_img.fileList[0].response.data[0]
      let size = 100
      await this.service.tools.jimp(uploadDir, size);
      this.ctx.request.body.jipmimgpath = `${uploadDir}_${size}x${size}${path.extname(uploadDir)}`
      this.ctx.request.body.cate_img = saveDir;
      this.ctx.request.body.pid = this.app.mongoose.Types.ObjectId(pid);
      const goods = new this.ctx.model.GoodsCate(this.ctx.request.body);
      result = goods.save();
    }
    return result;
  }
  // 编辑
  async editgoodsattribute() {
    try {
      const {
        id,
        pid,
      } = this.ctx.request.body;
      if (this.ctx.request.body.cate_img) {
        const {
          saveDir,
          uploadDir
        } = this.ctx.request.body.cate_img.fileList[0].response.data[0]
        let size = 100
        await this.service.tools.jimp(uploadDir, size);
        this.ctx.request.body.jipmimgpath = `${uploadDir}_${size}x${size}${path.extname(uploadDir)}`
        this.ctx.request.body.cate_img = saveDir;
      }
      if (pid !== 0) {
        this.ctx.request.body.pid = this.app.mongoose.Types.ObjectId(pid);
      }
      const result = await this.ctx.model.GoodsCate.updateOne({
          _id: id,
        },
        Object.assign(this.ctx.request.body, {
          add_time: new Date().getTime(),
        })
      );
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;

    }
  }
  async deletegoodsattribute() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.GoodsCate.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = GoodsCateService;
