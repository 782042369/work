// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/model/access';
import ExportAddauth from '../../../app/model/addauth';
import ExportArticle from '../../../app/model/article';
import ExportArticleCate from '../../../app/model/article_cate';
import ExportFocus from '../../../app/model/focus';
import ExportGoods from '../../../app/model/goods';
import ExportGoodsAttr from '../../../app/model/goods_attr';
import ExportGoodsCate from '../../../app/model/goods_cate';
import ExportGoodsColor from '../../../app/model/goods_color';
import ExportGoodsImage from '../../../app/model/goods_image';
import ExportGoodsType from '../../../app/model/goods_type';
import ExportGoodsTypeAttribute from '../../../app/model/goods_type_attribute';
import ExportNav from '../../../app/model/nav';
import ExportRole from '../../../app/model/role';
import ExportSetting from '../../../app/model/setting';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    Addauth: ReturnType<typeof ExportAddauth>;
    Article: ReturnType<typeof ExportArticle>;
    ArticleCate: ReturnType<typeof ExportArticleCate>;
    Focus: ReturnType<typeof ExportFocus>;
    Goods: ReturnType<typeof ExportGoods>;
    GoodsAttr: ReturnType<typeof ExportGoodsAttr>;
    GoodsCate: ReturnType<typeof ExportGoodsCate>;
    GoodsColor: ReturnType<typeof ExportGoodsColor>;
    GoodsImage: ReturnType<typeof ExportGoodsImage>;
    GoodsType: ReturnType<typeof ExportGoodsType>;
    GoodsTypeAttribute: ReturnType<typeof ExportGoodsTypeAttribute>;
    Nav: ReturnType<typeof ExportNav>;
    Role: ReturnType<typeof ExportRole>;
    Setting: ReturnType<typeof ExportSetting>;
    User: ReturnType<typeof ExportUser>;
  }
}
