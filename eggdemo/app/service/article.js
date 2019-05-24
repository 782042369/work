'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  // 查找
  async find() {
    const pagesize = this.ctx.request.body.pagesize || 10;
    const pagenum = this.ctx.request.body.pagenum || 1;
    const result = await this.ctx.model.Article
      .find(this.ctx.request.body)
      .sort({
        add_time: -1,
      })
      .skip((pagenum - 1) * pagesize)
      .limit(pagesize);
    return result;
  }
  // 增加
  async addarticle() {
    const title = this.ctx.request.body.title;
    let result = '';
    result = await this.ctx.model.Article.find({
      title,
    });
    if (result.length === 0) {
      const article = new this.ctx.model.Article(this.ctx.request.body);
      result = article.save();
    }
    return result;
  }
  // 编辑
  async edit() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Article.updateOne({
        _id,
      },
      Object.assign(this.ctx.request.body, {
        add_time: new Date().getTime(),
      })
    );
    return result;
  }
  // 删除
  async delete() {
    const _id = this.ctx.request.body.id;
    const result = await this.ctx.model.Article.deleteOne({
      _id,
    });
    return result;
  }
}

module.exports = ArticleService;
