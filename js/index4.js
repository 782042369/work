"use strict";
/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: ts 接口
 * @Date: 2019-04-22 15:40:22
 * @LastEditTime: 2019-04-23 12:11:31
 */
// es5定义方法
/* function printlabel() {
    console.log('printlabel')
} */
// ts定义方法
/* function printlabel(params: string): void {
    console.log(params)
}
printlabel('dadas') */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pro = /** @class */ (function () {
    function pro(name) {
        this.name = name;
    }
    pro.prototype.coding = function (code) {
        console.log('coding: ', this.name);
    };
    return pro;
}());
var web = /** @class */ (function (_super) {
    __extends(web, _super);
    function web(name) {
        return _super.call(this, name) || this;
    }
    web.prototype.eat = function () {
        console.log('eat ', this.name);
    };
    web.prototype.work = function () {
        console.log('work ', this.name);
    };
    return web;
}(pro));
