/*
 * @Author: 杨宏旋
 * @Date: 2021-05-06 15:46:55
 * @LastEditors: 杨宏旋
 * @LastEditTime: 2021-05-06 18:01:35
 * @Description:
 */
import Watcher from './Watcher.js'

export default class Compile {
  constructor(el, vm) {
    this.vm = vm
    this.el = document.querySelector(el)
    this.fragment = null
    this.init()
  }

  init() {
    this.fragment = this.nodeToFragment(this.el)
    this.compileElement(this.fragment)
    this.el.appendChild(this.fragment)
  }
  nodeToFragment(el) {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild
    while (child) {
      //将dom元素移入fragment中
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }
  compileElement(el) {
    const childNodes = el.childNodes
    ;[].slice.call(childNodes).forEach((node) => {
      const reg = /\{\{(.*)\}\}/
      const text = node.textContent
      if (this.isElementNode(node)) {
        this.compile(node)
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, reg.exec(text)[1])
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
  }
  compile(node) {
    const nodeAttrs = node.attributes
    Array.prototype.forEach.call(nodeAttrs, (attr) => {
      const attrName = attr.name
      if (this.isDirective(attrName)) {
        const exp = attr.value
        const dir = attrName.substring(2)
        if (this.isEventDirective(dir)) {
          //事件指令
          this.compileEvent(node, this.vm, exp, dir)
        } else {
          //v-model指令
          this.compileModel(node, this.vm, exp, dir)
        }
        node.removeAttribute(attrName)
      }
    })
  }
  compileEvent(node, vm, exp, dir) {
    const eventType = dir.split(':')[1]
    const cb = vm.methods && vm.methods[exp]
    if (eventType && cb) {
      node.addEventListener(eventType, cb.bind(vm), false)
    }
  }
  compileModel(node, vm, exp, dir) {
    let val = this.vm[exp]
    this.modelUpdater(node, val)
    new Watcher(this.vm, exp, (value) => {
      this.modelUpdater(node, value)
    })
    node.addEventListener('input', (e) => {
      const newValue = e.target.value
      if (val === newValue) {
        return
      }
      this.vm[exp] = newValue
      val = newValue
    })
  }
  compileText(node, exp) {
    const initText = this.vm[exp]
    this.updateText(node, initText)
    new Watcher(this.vm, exp, (value) => {
      this.updateText(node, value)
    })
  }
  modelUpdater(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value
  }
  updateText(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value
  }
  isDirective(attr) {
    return attr.indexOf('v-') == 0
  }
  isElementNode(node) {
    return node.nodeType == 1
  }
  isTextNode(node) {
    return node.nodeType == 3
  }
  isEventDirective(dir) {
    return dir.indexOf('on:') === 0
  }
}
