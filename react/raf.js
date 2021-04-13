/*
 * @Author: 杨宏旋
 * @Date: 2021-03-26 14:18:47
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-03-26 15:19:55
 * @Description:
 */
const slep = (delay) => {
  for (var start = Date.now(); Date.now() - start <= delay; ) {}
}
const tasks = [
  () => {
    console.log('任务1 start')
    slep(20)
    console.log('任务1 end')
  },
  () => {
    console.log('任务2 start')
    slep(20)
    console.log('任务2 end')
  },
  () => {
    console.log('任务3 start')
    slep(20)
    console.log('任务3 end')
  },
]
const doWorkIfNeeded = () => {
  tasks.shift()()
}
var myNonEssentialWork = (deadline) => {
  console.log(`剩余时间${parseInt(deadline.timeRemaining())}`)
  // 有剩余时间 或者 要超时
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    tasks.length > 0
  ) {
    doWorkIfNeeded()
  }
  // > 0 继续调度
  if (tasks.length > 0) {
    requestIdleCallback(myNonEssentialWork, { timeout: 1000 })
  }
}
requestIdleCallback(myNonEssentialWork, { timeout: 1000 })
