const menus = [{
	title: '权限',
	icon: 'user',
	key: '/access',
	subs: [{
		title: '权限列表',
		key: '/access',
		compoent: 'access',
	}, {
		title: '增加权限',
		key: '/addaccess',
		compoent: 'addaccess'
	}]
},
{
	title: '角色',
	icon: 'user',
	key: '/addrole',
	subs: [{
		title: '角色列表',
		key: '/role',
		compoent: 'role'
	}, {
		title: '增加角色',
		key: '/addrole',
		compoent: 'addrole',
	}]
},
{
	title: '管理员',
	icon: 'user',
	key: '/manager',
	subs: [{
		title: '管理员列表',
		key: '/manager',
		compoent: 'manager',
	}, {
		title: '增加管理员',
		key: '/addmanager',
		compoent: 'addmanager'
	}]
}
];
export default menus;
