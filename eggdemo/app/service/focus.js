'use strict';

const Service = require('egg').Service;

class FocusService extends Service {
  async find() {
    try {
      const _id = this.ctx.request.body.id;
      let arr = {};
      if (_id) {
        arr = {
          _id,
        };
      } else {
        arr = {};
      }
      const result = await this.ctx.model.Focus.find(arr);
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  // 单个文件
  // async uploadimg() {
  //   console.log(2);
  //   try {
  //     const stream = await this.ctx.getFileStream(); // 表单提交数据 单个文件
  //     const target = 'app/public/admin/upload/' + new Date().getTime() + '-' + path.basename(stream.filename)
  //     const writestream = fs.createWriteStream(target);
  //     stream.pipe(writestream)
  //     pump(stream, writestream)
  //     console.log('stream: ', stream);
  //     return {
  //       url: target,
  //       file: stream.fields
  //     }
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // }
  // 多个文件

  async addbanner() {
    try {
      const { banner, focus_img, sort, title, type } = this.ctx.request.body;
      banner.fileList.forEach(res => {
        const link = res.response.data[0].saveDir;
        const savearr = new this.ctx.model.Focus({
          title,
          type,
          focus_img,
          link,
          sort,
        });
        savearr.save();
      });
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  async editbanner() {
    try {
      const { banner, title, type, focus_img, sort, id } = this.ctx.request.body;
      if (banner) {
        const link = banner.file.response.data[0].saveDir;
        const result = await this.ctx.model.Focus.updateOne(
          {
            _id: id,
          },
          {
            title,
            type,
            focus_img,
            sort,
            add_time: new Date().getTime(),
            link,
          }
        );
        return result;
      }
      const result = await this.ctx.model.Focus.updateOne(
        {
          _id: id,
        },
        {
          title,
          type,
          focus_img,
          sort,
          add_time: new Date().getTime(),
        }
      );
      return result;
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
  }
  async deletebanner() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Focus.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = FocusService;
