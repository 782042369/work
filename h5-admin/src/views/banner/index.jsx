/*
 * @Author: 杨宏旋
 * @LastEditors: 杨宏旋
 * @Description: 角色
 * @Date: 2019-05-05 15:48:46
 * @LastEditTime: 2019-05-15 13:38:38
 */
import React, { Component } from 'react';
import { Table, Divider, Button, message } from 'antd';
import { bannerlist, deletebanner } from '../../api/banner';
import datefilter from '../../tool/datefilter';
import { statusfilter } from '../../tool/statusfilter';
import { Link } from 'react-router-dom';

const { Column } = Table;
class role extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}
	getlist() {
		bannerlist()
			.then((res) => {
				if (res.status === 1) {
					this.setState({
						data: res.data
					});
				}
			})
			.catch((err) => {
				console.log('err: ', err);
			});
	}
	componentDidMount() {
		this.getlist();
	}
	deletebanner(id) {
		deletebanner({
			id
		})
			.then((res) => {
				console.log('res: ', res);
				this.getlist();
				message.success(res.message);
			})
			.catch((err) => {
				console.log('err: ', err);
			});
	}
	render() {
		return (
			<div>
				<Table dataSource={this.state.data}>
					<Column title="名称" dataIndex="title" key="title" />
					<Column
						title="状态"
						dataIndex="status"
						key="status"
						render={(text, record) => <div type="primary">{statusfilter(text)}</div>}
					/>

					<Column
						title="图片"
						dataIndex="link"
						key="link"
						render={(text, record) => (
							<img
								style={{ maxWidth: '10vw', maxHeight: '10vw' }}
								alt=""
								src={`http://127.0.0.1:7001${text}`}
							/>
						)}
					/>
					<Column title="点击跳转" dataIndex="focus_img" key="focus_img" />
					<Column
						title="时间"
						key="add_time"
						dataIndex="add_time"
						render={(text, record) => <div type="primary">{datefilter(text)}</div>}
					/>
					<Column
						title="操作"
						key="_id"
						dataIndex="_id"
						render={(text, record) => (
							<span>
								<Link to={'/addbanner?id=' + text}>
									<Button type="primary">修改</Button>
								</Link>
								<Divider type="vertical" />
								<Button type="danger" onClick={this.deletebanner.bind(this, text)}>
									删除
								</Button>
							</span>
						)}
					/>
				</Table>
			</div>
		);
	}
}

export default role;
