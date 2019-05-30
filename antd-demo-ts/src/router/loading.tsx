import * as React from 'react'

import { Spin } from 'antd'
import Loadable from 'react-loadable'
class index extends React.Component<Loadable.LoadingComponentProps> {
	render() {
		return (
			<div>
				{this.props.error}
				{this.props.isLoading}
				{this.props.pastDelay}
				{this.props.timedOut}
				<Spin tip="Loading..." />
			</div>
		)
	}
}

export default index
