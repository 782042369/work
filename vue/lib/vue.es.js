function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}var i,a,u,o=function(){function t(){e(this,t),this.subs=[]}return n(t,[{key:"addSub",value:function(e){this.subs.push(e)}},{key:"notify",value:function(){this.subs.forEach((function(e){e.update()}))}}]),t}();u=null,(a="target")in(i=o)?Object.defineProperty(i,a,{value:u,enumerable:!0,configurable:!0,writable:!0}):i[a]=u;var r=function(){function t(n,i,a){e(this,t),this.cb=a,this.vm=n,this.exp=i,this.value=this.get()}return n(t,[{key:"update",value:function(){this.run()}},{key:"run",value:function(){var e=this.vm.data[this.exp],t=this.value;e!==t&&(this.value=e,this.cb.call(this.vm,e,t))}},{key:"get",value:function(){o.target=this;var e=this.vm.data[this.exp];return o.target=null,e}}]),t}();function s(e){Object.keys(e).forEach((function(t){!function(e,t,n){var i=new o;Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){return o.target&&i.addSub(o.target),n},set:function(e){e!==n&&(n=e,i.notify())}})}(e,t,e[t])}))}var c=function(){function t(n,i){e(this,t),this.vm=i,this.el=document.querySelector(n),this.fragment=null,this.init()}return n(t,[{key:"init",value:function(){this.fragment=this.nodeToFragment(this.el),this.compileElement(this.fragment),this.el.appendChild(this.fragment)}},{key:"nodeToFragment",value:function(e){for(var t=document.createDocumentFragment(),n=e.firstChild;n;)t.appendChild(n),n=e.firstChild;return t}},{key:"compileElement",value:function(e){var t=this,n=e.childNodes;[].slice.call(n).forEach((function(e){var n=/\{\{(.*)\}\}/,i=e.textContent;t.isElementNode(e)?t.compile(e):t.isTextNode(e)&&n.test(i)&&t.compileText(e,n.exec(i)[1]),e.childNodes&&e.childNodes.length&&t.compileElement(e)}))}},{key:"compile",value:function(e){var t=this,n=e.attributes;Array.prototype.forEach.call(n,(function(n){var i=n.name;if(t.isDirective(i)){var a=n.value,u=i.substring(2);t.isEventDirective(u)?t.compileEvent(e,t.vm,a,u):t.compileModel(e,t.vm,a,u),e.removeAttribute(i)}}))}},{key:"compileEvent",value:function(e,t,n,i){var a=i.split(":")[1],u=t.methods&&t.methods[n];a&&u&&e.addEventListener(a,u.bind(t),!1)}},{key:"compileModel",value:function(e,t,n,i){var a=this,u=this.vm[n];this.modelUpdater(e,u),new r(this.vm,n,(function(t){a.modelUpdater(e,t)})),e.addEventListener("input",(function(e){var t=e.target.value;u!==t&&(a.vm[n]=t,u=t)}))}},{key:"compileText",value:function(e,t){var n=this,i=this.vm[t];this.updateText(e,i),new r(this.vm,t,(function(t){n.updateText(e,t)}))}},{key:"modelUpdater",value:function(e,t,n){e.value=void 0===t?"":t}},{key:"updateText",value:function(e,t){e.textContent=void 0===t?"":t}},{key:"isDirective",value:function(e){return 0==e.indexOf("v-")}},{key:"isElementNode",value:function(e){return 1==e.nodeType}},{key:"isTextNode",value:function(e){return 3==e.nodeType}},{key:"isEventDirective",value:function(e){return 0===e.indexOf("on:")}}]),t}(),l=function(){function t(n){var i=this;e(this,t),this.data=n.data,this.methods=n.methods,Object.keys(this.data).forEach((function(e){i.proxyKeys(e)})),s(this.data),new c(n.el,this),n.mounted.call(this)}return n(t,[{key:"proxyKeys",value:function(e){Object.defineProperty(this,e,{enumerable:!1,configurable:!0,get:function(){return this.data[e]},set:function(t){this.data[e]=t}})}}]),t}();export default l;
