/**
 * 
 * @param {*} json 需要合并的原始数组
 * @param {*} parentid 过滤父对象的字段
 * @param {*} childrenid 和父过滤的字段
 */
const mergefieldtojson = function(json: any, parentid: any, childrenid: any): [] {
	if (!parentid) {
		return []
	}
	if (!childrenid) {
		return []
	}
	const arr = json.filter((res: any) => res[parentid] === '')
	arr.forEach((val: any) => {
		val.items = []
		json.forEach((res: any) => {
			if (res[parentid] === val[childrenid]) {
				val.items.push(res)
			}
		})
	})
	return arr
}
export default mergefieldtojson
