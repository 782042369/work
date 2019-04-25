// vue 测试工具引入
import {
  expect
} from 'chai'
import {
  mount
} from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
// 创建测试组件
describe('测试 HelloWorld 组件', () => {
  // 多个不同测试用例
  it('测试查看功能', () => {
    // 渲染组件
    const wrapper = mount(HelloWorld)
    // 寻找dom元素
    // console.log(wrapper.find('.todolist'));
    // 通过wm寻找data数据
    // console.log(wrapper.vm.list);
    // 断言
    expect(wrapper.vm.list.length).to.be.equal(2)
  })
  // 增加用例
  it('测试增加功能', () => {
    // 渲染组件
    const wrapper = mount(HelloWorld)
    // 赋值
    wrapper.setData({
      todoval: 'test'
    })
    // 触发回车事件
    wrapper.find('.newtodo').trigger('keyup.enter')
    // 断言是否有增加数据
    expect(wrapper.vm.list[2].text).to.be.equal('test')
  })
  it('测试删除功能', () => {
    // 渲染组件
    const wrapper = mount(HelloWorld)
    // 触发删除按钮
    // console.log(wrapper.find('.deletebtn'));
    const btn = wrapper.find('.deletebtn')
    btn.trigger('click')
    // 断言是否有增加数据
    expect(wrapper.vm.list.length).to.be.equal(1)
  })
  it('测试编辑功能', () => {
    // 渲染组件
    const wrapper = mount(HelloWorld)
    // 查找dom
    const input = wrapper.find('.listinput')
    // 双击触发
    input.trigger('dblclick')
    // 断言是否有激活classs
    expect(input.classes().length).to.be.equal(2)
    console.log('激活classs是', input.classes());
  })
})
