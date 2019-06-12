import { observable } from 'mobx'
class User {
	@observable username: string | null = window.sessionStorage.getItem('userName') // 用户名
	@observable userid: string | null = window.sessionStorage.getItem('role_id') // 用户id
	@observable userlogin: boolean = false // 登录
}
export default new User()
