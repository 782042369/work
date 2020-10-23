/*
 * @Author: 杨宏旋
 * @Date: 2020-10-16 17:45:11
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2020-10-16 18:24:05
 * @Description:
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  // // 1. 如果没下一层了，返回 0
  if (!root) {
    return 0
  }
  // console.log('root: 1111', root)
  // // 2. 返回左右子树中最深的那一层
  // return Math.max(maxDepth(root.left) + 1, maxDepth(root.right) + 1)
  // 1. 设置深度为 0
  let depth = 0

  // 2. 每层遍历
  let bfs = [root]
  console.log('bfs: ', bfs)

  // 3. 逐层访问树
  while (bfs.length) {
    console.log('bfs: ', bfs)
    // 3.1 每次遍历，深度 + 1
    depth++

    // 3.2 设置下一次需要遍历的节点
    const tempBfs = []

    // 3.3 遍历本次所有节点，将有内容的都添加进来
    for (let i = 0; i < bfs.length; i++) {
      if (bfs[i].left) {
        tempBfs.push(bfs[i].left)
      }
      if (bfs[i].right) {
        tempBfs.push(bfs[i].right)
      }
    }
    console.log('tempBfs: ', tempBfs)
    // 3.4 交接 tempBfs 到 bfs 上
    bfs = tempBfs
  }

  // 4. 返回深度
  return depth
}
const count = maxDepth({
  val: 3,
  left: { val: 9 },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
}) // 3
console.log('count: ', count)
