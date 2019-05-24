/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: url参数
 * @Date: 2019-05-06 17:53:48
 * @LastEditTime: 2019-05-07 09:54:57
 */
/**
 * 
 * @param {*} name 获取url参数名
 */
const getUrlParam = (name) => {
	if (window.location.search) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var r = window.location.search.substr(1).match(reg);
		var strValue = '';
		if (r != null) {
			strValue = unescape(r[2]);
		}
		return strValue;
	} else {
		return false;
	}
};
export default getUrlParam;
