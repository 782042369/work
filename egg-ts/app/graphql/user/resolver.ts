import { users } from './db'
console.log('users: ', users)

const resolvers = {
	Query: {
		hello: () => {
			console.log(1)
			return 'Hello World!'
		},
		users: () => {
			return '1'
		}
	}
}

export default resolvers
