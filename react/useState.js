/*
 * @Author: 杨宏旋
 * @Date: 2021-05-21 15:00:34
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-21 18:24:36
 * @Description:
 */
let isMount = true
let workInProgressHook = null
const filber = {
  stateNode: App,
  memoizedState: null,
  qusue: null,
}
function useState(initState) {
  let hook
  if (isMount) {
    hook = {
      memoizedState: initState,
      next: null,
      queue: {
        pending: null,
      },
    }
    if (!filber.memoizedState) {
      filber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  } else {
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }
  let baseState = hook.memoizedState
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next
    do {
      const action = firstUpdate.action
      baseState = typeof action === 'function' ? action(baseState) : action
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending.next)
    hook.queue.pending = null
  }
  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}
function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  }
  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update
  Schedule()
}
function Schedule() {
  workInProgressHook = filber.memoizedState
  const app = filber.stateNode()
  isMount = false
  return app
}
function App() {
  const [num, setNum] = useState(0)
  const [num1, setNum1] = useState(100)
  console.log('num1: ', num1)
  console.log('isMount: ', isMount)
  console.log('num: ', num)
  return {
    onClick() {
      setNum(3)
    },
    onFocus() {
      setNum1((num) => num + 1)
    },
  }
}
window.app = Schedule()
