!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (((e = 'undefined' != typeof globalThis ? globalThis : e || self).vue =
        e.vue || {}),
      (e.vue.umd = e.vue.umd || {}),
      (e.vue.umd.js = t()))
})(this, function () {
  'use strict'
  function e(e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function')
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n]
      ;(i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        'value' in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i)
    }
  }
  function n(e, n, i) {
    return n && t(e.prototype, n), i && t(e, i), e
  }
  var i,
    u,
    o,
    a = (function () {
      function t() {
        e(this, t), (this.subs = [])
      }
      return (
        n(t, [
          {
            key: 'addSub',
            value: function (e) {
              this.subs.push(e)
            },
          },
          {
            key: 'notify',
            value: function () {
              this.subs.forEach(function (e) {
                e.update()
              })
            },
          },
        ]),
        t
      )
    })()
  ;(o = null),
    (u = 'target') in (i = a)
      ? Object.defineProperty(i, u, {
          value: o,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (i[u] = o)
  var r = (function () {
    function t(n, i, u) {
      e(this, t),
        (this.cb = u),
        (this.vm = n),
        (this.exp = i),
        (this.value = this.get())
    }
    return (
      n(t, [
        {
          key: 'update',
          value: function () {
            this.run()
          },
        },
        {
          key: 'run',
          value: function () {
            var e = this.vm.data[this.exp],
              t = this.value
            e !== t && ((this.value = e), this.cb.call(this.vm, e, t))
          },
        },
        {
          key: 'get',
          value: function () {
            a.target = this
            var e = this.vm.data[this.exp]
            return (a.target = null), e
          },
        },
      ]),
      t
    )
  })()
  function s(e) {
    Object.keys(e).forEach(function (t) {
      !(function (e, t, n) {
        var i = new a()
        Object.defineProperty(e, t, {
          enumerable: !0,
          configurable: !0,
          get: function () {
            return a.target && i.addSub(a.target), n
          },
          set: function (e) {
            e !== n && ((n = e), i.notify())
          },
        })
      })(e, t, e[t])
    })
  }
  var c = (function () {
    function t(n, i) {
      e(this, t),
        (this.vm = i),
        (this.el = document.querySelector(n)),
        (this.fragment = null),
        this.init()
    }
    return (
      n(t, [
        {
          key: 'init',
          value: function () {
            ;(this.fragment = this.nodeToFragment(this.el)),
              this.compileElement(this.fragment),
              this.el.appendChild(this.fragment)
          },
        },
        {
          key: 'nodeToFragment',
          value: function (e) {
            for (
              var t = document.createDocumentFragment(), n = e.firstChild;
              n;

            )
              t.appendChild(n), (n = e.firstChild)
            return t
          },
        },
        {
          key: 'compileElement',
          value: function (e) {
            var t = this,
              n = e.childNodes
            ;[].slice.call(n).forEach(function (e) {
              var n = /\{\{(.*)\}\}/,
                i = e.textContent
              t.isElementNode(e)
                ? t.compile(e)
                : t.isTextNode(e) &&
                  n.test(i) &&
                  t.compileText(e, n.exec(i)[1]),
                e.childNodes && e.childNodes.length && t.compileElement(e)
            })
          },
        },
        {
          key: 'compile',
          value: function (e) {
            var t = this,
              n = e.attributes
            Array.prototype.forEach.call(n, function (n) {
              var i = n.name
              if (t.isDirective(i)) {
                var u = n.value,
                  o = i.substring(2)
                t.isEventDirective(o)
                  ? t.compileEvent(e, t.vm, u, o)
                  : t.compileModel(e, t.vm, u, o),
                  e.removeAttribute(i)
              }
            })
          },
        },
        {
          key: 'compileEvent',
          value: function (e, t, n, i) {
            var u = i.split(':')[1],
              o = t.methods && t.methods[n]
            u && o && e.addEventListener(u, o.bind(t), !1)
          },
        },
        {
          key: 'compileModel',
          value: function (e, t, n, i) {
            var u = this,
              o = this.vm[n]
            this.modelUpdater(e, o),
              new r(this.vm, n, function (t) {
                u.modelUpdater(e, t)
              }),
              e.addEventListener('input', function (e) {
                var t = e.target.value
                o !== t && ((u.vm[n] = t), (o = t))
              })
          },
        },
        {
          key: 'compileText',
          value: function (e, t) {
            var n = this,
              i = this.vm[t]
            this.updateText(e, i),
              new r(this.vm, t, function (t) {
                n.updateText(e, t)
              })
          },
        },
        {
          key: 'modelUpdater',
          value: function (e, t, n) {
            e.value = void 0 === t ? '' : t
          },
        },
        {
          key: 'updateText',
          value: function (e, t) {
            e.textContent = void 0 === t ? '' : t
          },
        },
        {
          key: 'isDirective',
          value: function (e) {
            return 0 == e.indexOf('v-')
          },
        },
        {
          key: 'isElementNode',
          value: function (e) {
            return 1 == e.nodeType
          },
        },
        {
          key: 'isTextNode',
          value: function (e) {
            return 3 == e.nodeType
          },
        },
        {
          key: 'isEventDirective',
          value: function (e) {
            return 0 === e.indexOf('on:')
          },
        },
      ]),
      t
    )
  })()
  return (function () {
    function t(n) {
      var i = this
      e(this, t),
        (this.data = n.data),
        (this.methods = n.methods),
        Object.keys(this.data).forEach(function (e) {
          i.proxyKeys(e)
        }),
        s(this.data),
        new c(n.el, this),
        n.mounted.call(this)
    }
    return (
      n(t, [
        {
          key: 'proxyKeys',
          value: function (e) {
            Object.defineProperty(this, e, {
              enumerable: !1,
              configurable: !0,
              get: function () {
                return this.data[e]
              },
              set: function (t) {
                this.data[e] = t
              },
            })
          },
        },
      ]),
      t
    )
  })()
})
