/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-20 19:46:38
 */
import React, { Component } from 'react';
import { addbanner, editbanner, bannerlist } from '../../api/banner';
import getUrlParam from '../../tool/getUrlParam';
import { message } from 'antd';
import BashForm from '../../components/Form';

class editbannner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	flatten(arr) {
		while (arr.some((item) => Array.isArray(item))) {
			arr = [].concat(...arr);
		}
		return arr;
	}
	handleSubmit = (values) => {
		if (getUrlParam('id')) {
			let arr = { id: getUrlParam('id') };
			editbanner(Object.assign(values, arr))
				.then((res) => {
					console.log(res);
					message.success(res.message);
				})
				.catch((err) => {
					message.error(err.message);
					console.log(err);
				});
		} else {
			addbanner(values)
				.then((res) => {
					if (res.status === 1) {
						message.success(res.message);
					} else {
						message.error(res.message);
					}
				})
				.catch((err) => {
					console.log(err);
					message.error(err.message);
				});
		}
	}
	componentDidMount() {
		if (getUrlParam('id')) {
			this.setState({
				h1title: '修改轮播图'
			});
			console.log(getUrlParam('id'));
			bannerlist({
				_id: getUrlParam('id')
			})
				.then((res) => {
					let { title, sort, focus_img, type, link } = res.data[0];
					type = Number(type);
					this.setState({
						title,
						sort,
						focus_img,
						type,
						link
					});
				})
				.catch((err) => {
					console.log('err: ', err);
				});
		} else {
			this.setState({
				h1title: '增加轮播图'
			});
		}
	}

	render() {
		const formList = [
			{
				type: 'input',
				lable: '轮播图名称',
				setValue: this.state.title,
				placeholder: '请输入',
				field: 'title',
				required: true,
				message: 'Please input your title!'
			},
			{
				type: 'select',
				lable: '图片所属',
				setValue: this.state.type,
				placeholder: '请输入',
				field: 'type',
				required: true,
				message: 'Please input your type!',
				list: [ { id: 1, name: '网站' }, { id: 2, name: 'app' }, { id: 3, name: '小程序' } ] // //1、网站 2、app 3、小程序
			},
			{
				type: 'input',
				lable: '点击跳转地址',
				setValue: this.state.focus_img,
				placeholder: '请输入',
				field: 'focus_img',
				required: true,
				message: 'Please input your focus_img!'
			},
			{
				type: 'input',
				lable: '排序',
				setValue: this.state.sort,
				placeholder: '请输入',
				field: 'sort',
				required: true,
				message: 'Please input your sort!'
			},
			{
				type: 'upload',
				lable: '轮播图',
				setValue: this.state.link,
				placeholder: '请输入',
				field: 'banner',
				required: true,
				message: 'Please input your banner!'
			}
		];
		return <BashForm formList={formList} h1title={this.state.h1title} formSubmit={this.handleSubmit} />;
	}
}

export default editbannner;
