import React, { Component } from 'react'
import { goodslist, deletegoodsphotolist, editgoodsphotocolor } from '../../api/goods'
//  editgoodsphonelist
import getUrlParam from '../../tool/getUrlParam'
import { message, Button } from 'antd'
import From from '../../components/Form'
class index extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleSubmit = (values) => {
		editgoodsphotocolor({ values })
			.then((res) => {
				message.success(res.message)
			})
			.catch((err) => {
				message.error(err.message)
				console.log(err)
			})
	}
	deletegoodsphotolist(_id) {
		deletegoodsphotolist({ _id })
			.then((res) => {
				message.success(res.message)
				this.getgoodsphoto()
			})
			.catch((err) => {
				message.error(err.message)
				this.getgoodsphoto()
				console.log(err)
			})
	}
	getgoodsphoto() {
		goodslist({
			_id: getUrlParam('id')
		})
			.then((res) => {
				let color = []
				res.data.goods_color.forEach((element, index) => {
					color.push({
						label: element.color_name,
						value: element._id
					})
				})
				console.log('color: ', color)
				let arr = []
				res.data.photoList.forEach((element, index) => {
					arr.push({
						type: 'imgselect',
						lable: `相册${index + 1}`,
						setValue: element.color_id,
						placeholder: '请输入',
						field: element['_id'],
						imgpath: `http://127.0.0.1:7001${element.img_url}`,
						list: color,
						render: () => (
							<Button
								style={{ marginLeft: '2vw' }}
								htmlType="submit"
								onClick={this.deletegoodsphotolist.bind(this, element['_id'])}
								type="primary"
							>
								删除
							</Button>
						)
					})
				})
				this.setState({
					optionlist: arr,
					h1title: '修改商品相册颜色绑定'
				})
			})
			.catch((err) => {
				console.log('err: ', err)
			})
	}
	componentDidMount() {
		this.getgoodsphoto()
	}
	handlephontChange = (info) => {}
	render() {
		return <From formList={this.state.optionlist} h1title={this.state.h1title} formSubmit={this.handleSubmit} />
	}
}
export default index
