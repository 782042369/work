import { Application } from 'egg';
export default function index(app: Application): void {
	const { router, controller }: any = app;
	/**
   * 前台
   */
	router.get('/', controller.index.home.index);
}
