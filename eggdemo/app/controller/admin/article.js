'use strict';

const BaseController = require('./base');

class ArticleController extends BaseController {
  async index() {
    try {
      const result = await this.service.article.find();
      this.success(1, '文章列表请求成功', result);
    } catch (error) {
      this.error(0, '文章列表请求失败', error);
    }
  }
  async addarticle() {
    try {
      const result = await this.service.article.addarticle();
      if (result.length > 0) {
        this.error(0, '文章已经存在', result);
      } else {
        this.success(1, '增加文章成功', result);
      }
    } catch (error) {
      this.error(0, '增加文章失败', error);
    }
  }
  async editarticle() {
    try {
      const result = await this.service.article.edit();
      this.success(1, '修改文章成功', result);
    } catch (error) {
      this.error(0, '修改文章失败', error);
    }
  }
  async deletearticle() {
    try {
      const result = await this.service.article.delete();
      this.success(1, '删除文章成功', result);
    } catch (error) {
      this.error(0, '删除文章失败', error);
    }
  }
}

module.exports = ArticleController;
