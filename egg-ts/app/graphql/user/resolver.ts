import { users } from './db'
console.log('users: ', users)

const resolvers = {
	Query: {
		hello: () => {
			console.log(1)
			return 'Hello World!'
		}
	}
}

export default resolvers
