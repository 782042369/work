import { Application } from 'egg'
export default function api(app: Application): void {
	const { router, controller }: any = app
	/**
   * api
   */
	router.get('/api/product', controller.api.product.index)
	router.get('/api/product/add', controller.api.product.add)
	router.get('/api/product/delete', controller.api.product.delete)
	router.get('/api/product/edit', controller.api.product.edit)

	router.get('/api/user', controller.api.user.index)
	router.get('/api/user/add', controller.api.user.add)
	router.get('/api/user/delete', controller.api.user.delete)
	router.get('/api/user/edit', controller.api.user.edit)
}
