// This file is created by egg-ts-helper@1.25.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAccess from '../../../app/controller/admin/access';
import ExportAdminArticle from '../../../app/controller/admin/article';
import ExportAdminBase from '../../../app/controller/admin/base';
import ExportAdminFocus from '../../../app/controller/admin/focus';
import ExportAdminGoods from '../../../app/controller/admin/goods';
import ExportAdminGoodsCate from '../../../app/controller/admin/goodsCate';
import ExportAdminGoodsColor from '../../../app/controller/admin/goodsColor';
import ExportAdminGoodsType from '../../../app/controller/admin/goodsType';
import ExportAdminGoodsTypeAttribute from '../../../app/controller/admin/goodsTypeAttribute';
import ExportAdminLogin from '../../../app/controller/admin/login';
import ExportAdminManager from '../../../app/controller/admin/manager';
import ExportAdminNav from '../../../app/controller/admin/nav';
import ExportAdminRole from '../../../app/controller/admin/role';
import ExportAdminSetting from '../../../app/controller/admin/setting';
import ExportAdminUploadimg from '../../../app/controller/admin/uploadimg';
import ExportIndexHome from '../../../app/controller/index/home';

declare module 'egg' {
  interface IController {
    admin: {
      access: ExportAdminAccess;
      article: ExportAdminArticle;
      base: ExportAdminBase;
      focus: ExportAdminFocus;
      goods: ExportAdminGoods;
      goodsCate: ExportAdminGoodsCate;
      goodsColor: ExportAdminGoodsColor;
      goodsType: ExportAdminGoodsType;
      goodsTypeAttribute: ExportAdminGoodsTypeAttribute;
      login: ExportAdminLogin;
      manager: ExportAdminManager;
      nav: ExportAdminNav;
      role: ExportAdminRole;
      setting: ExportAdminSetting;
      uploadimg: ExportAdminUploadimg;
    }
    index: {
      home: ExportIndexHome;
    }
  }
}
