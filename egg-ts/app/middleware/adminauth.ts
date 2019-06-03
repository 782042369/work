'use strict'

import { Context } from 'egg'

export default function adminauth() {
	return async (ctx: Context, next: any) => {
		// console.log('ctx: ', ctx);
		// admin后台登录校验
		if (ctx) {
			await next()
		}
		//  else {
		//   ctx.body = {
		//     data: '-99'
		//   }
		// }
	}
}
