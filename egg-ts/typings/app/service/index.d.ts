// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/service/access';
import ExportArticle from '../../../app/service/article';
import ExportCache from '../../../app/service/cache';
import ExportFocus from '../../../app/service/focus';
import ExportGoods from '../../../app/service/goods';
import ExportGoodsCate from '../../../app/service/goodsCate';
import ExportGoodsColor from '../../../app/service/goodsColor';
import ExportGoodsType from '../../../app/service/goodsType';
import ExportGoodsTypeAttribute from '../../../app/service/goodsTypeAttribute';
import ExportManager from '../../../app/service/manager';
import ExportNav from '../../../app/service/nav';
import ExportRole from '../../../app/service/role';
import ExportSetting from '../../../app/service/setting';
import ExportTools from '../../../app/service/tools';
import ExportUploadimg from '../../../app/service/uploadimg';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    access: ExportAccess;
    article: ExportArticle;
    cache: ExportCache;
    focus: ExportFocus;
    goods: ExportGoods;
    goodsCate: ExportGoodsCate;
    goodsColor: ExportGoodsColor;
    goodsType: ExportGoodsType;
    goodsTypeAttribute: ExportGoodsTypeAttribute;
    manager: ExportManager;
    nav: ExportNav;
    role: ExportRole;
    setting: ExportSetting;
    tools: ExportTools;
    uploadimg: ExportUploadimg;
    user: ExportUser;
  }
}
