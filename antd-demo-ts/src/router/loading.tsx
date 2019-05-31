import * as React from 'react'

import { Spin } from 'antd'
import Loadable from 'react-loadable'
class index extends React.Component<Loadable.LoadingComponentProps> {
	render() {
		let { error, isLoading, pastDelay, timedOut } = this.props
		return (
			<div>
				{error} {isLoading} {pastDelay} {timedOut}
				<Spin tip="Loading..." />
			</div>
		)
	}
}

export default index
