import {
  observable
} from 'mobx'
class User {
  @observable username = window.sessionStorage.getItem('userName'); // 用户名
  @observable userid = window.sessionStorage.getItem('role_id'); // 用户id
  @observable userlogin = window.sessionStorage.getItem('role_id') ? true : false; // 登录

}
export default new User()
