import * as React from 'react'

const asyncComponent = (importComponent: any) => {
	return class extends React.Component {
		state = {
			component: null
		}
		componentDidMount() {
			importComponent().then((cmp: any) => {
				this.setState({ component: cmp.default })
			})
		}
		render() {
			const C = this.state.component
			return C
		}
	}
}

export default asyncComponent
