(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{100:function(e,t,n){"use strict";t.a=function(e,t,n){if(console.log("json: ",e),console.log("parentid: ",t),console.log("childrenid: ",n),!t)throw t;if(!n)throw n;var a=e.filter(function(e){return""===e[t]});return a.forEach(function(a){a.items=[],e.forEach(function(e){e[t]===a[n]&&a.items.push(e)})}),a}},134:function(e,t,n){e.exports=n(239)},238:function(e,t,n){},239:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(6),c=n.n(o),l=(n(139),n(36)),u=n.n(l),i=(n(141),n(38)),s=n.n(i),m=(n(130),n(44)),d=n.n(m),h=n(18),p=n(19),f=n(22),b=n(20),E=n(21),g=n(85),y=n(23),j=n(100),v=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).renderSubMenu=function(e){var t=e.url,a=e.module_name,o=e.items;return console.log("url + module_name: ",t+a),r.a.createElement(s.a.SubMenu,{selectedKeys:["goodslist"],key:t+a,title:r.a.createElement("span",null,r.a.createElement(d.a,{type:"user"}),r.a.createElement("span",null,a))},o&&o.map(function(e){return e.items&&e.items.length>0?n.renderSubMenu(e):n.renderMenuItem(e)}))},n.renderMenuItem=function(e){var t=e.url,n=e.module_name;return console.log("url: ",t),r.a.createElement(s.a.Item,{key:t,selectedKeys:["goodslist"]},r.a.createElement(y.b,{to:t},r.a.createElement("span",null,n)))},n.state={list:[],openurl:[]},n}return Object(E.a)(t,e),Object(p.a)(t,[{key:"getlist",value:function(){var e=this;Object(g.c)({role_id:sessionStorage.getItem("role_id")}).then(function(t){if(1===t.status){var n=[];t.data.length,n.push("/noaccess"),e.setState({list:Object(j.a)(t.data,"pid","parent_id"),openurl:n})}}).catch(function(e){console.log("err: ",e)})}},{key:"componentDidMount",value:function(){this.getlist(),console.log(this.props.path)}},{key:"render",value:function(){var e=this;return r.a.createElement(s.a,{mode:"inline",defaultOpenKeys:["\u5546\u54c1\u7ba1\u7406"]},this.state.list.map(function(t){return t.items&&t.items.length>0?e.renderSubMenu(t):e.renderMenuItem(t)}))}}]),t}(a.Component),O=function(e){return function(t){function n(){var e;return Object(h.a)(this,n),(e=Object(f.a)(this,Object(b.a)(n).call(this))).state={component:null},e}return Object(E.a)(n,t),Object(p.a)(n,[{key:"componentDidMount",value:function(){var t=this;e().then(function(e){t.setState({component:e.default})})}},{key:"render",value:function(){var e=this.state.component;return e?r.a.createElement(e,this.props):null}}]),n}(a.Component)},w=n(34),P=(n(125),n(81)),x=n.n(P),k=n(123),_=function(e){function t(e){var n;return Object(h.a)(this,t),(n=Object(f.a)(this,Object(b.a)(t).call(this,e))).state={isAuthenticated:!!window.sessionStorage.getItem("role_id")},n}return Object(E.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){if(!this.state.isAuthenticated){var e=this.props.history;setTimeout(function(){e.replace("/")},1e3)}}},{key:"render",value:function(){var e=this.props,t=e.component,n=Object(k.a)(e,["component"]);return this.state.isAuthenticated?r.a.createElement(w.b,Object.assign({},n,{render:function(e){return r.a.createElement(t,e)}})):x.a.error("\u8bf7\u767b\u5f55...")}}]),t}(a.Component),C=Object(w.f)(_),M=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(6)]).then(n.bind(null,567))}),S=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(7)]).then(n.bind(null,568))}),I=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(21)]).then(n.bind(null,585))}),A=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(12)]).then(n.bind(null,569))}),D=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(23)]).then(n.bind(null,570))}),R=O(function(){return Promise.all([n.e(0),n.e(2),n.e(5),n.e(13)]).then(n.bind(null,571))}),H=O(function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(14)]).then(n.bind(null,572))}),T=O(function(){return n.e(22).then(n.bind(null,573))}),K=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(15)]).then(n.bind(null,574))}),W=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(8)]).then(n.bind(null,583))}),B=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(19)]).then(n.bind(null,575))}),J=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(19)]).then(n.bind(null,576))}),N=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(18)]).then(n.bind(null,577))}),U=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(11)]).then(n.bind(null,578))}),q=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(17)]).then(n.bind(null,579))}),F=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(10)]).then(n.bind(null,580))}),L=O(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(4),n.e(16)]).then(n.bind(null,581))}),$=O(function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(9)]).then(n.bind(null,582))}),z=function(e){function t(){return Object(h.a)(this,t),Object(f.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w.d,null,r.a.createElement(C,{exact:!0,path:"/access",component:M}),r.a.createElement(C,{exact:!0,path:"/auth",component:H}),r.a.createElement(C,{exact:!0,path:"/addaccess",component:S}),r.a.createElement(C,{exact:!0,path:"/manager",component:I}),r.a.createElement(C,{exact:!0,path:"/addmanager",component:A}),r.a.createElement(C,{exact:!0,path:"/role",component:D}),r.a.createElement(C,{exact:!0,path:"/addrole",component:R}),r.a.createElement(C,{exact:!0,path:"/noaccess",component:T}),r.a.createElement(C,{exact:!0,path:"/banner",component:K}),r.a.createElement(C,{exact:!0,path:"/addbanner",component:W}),r.a.createElement(C,{exact:!0,path:"/goodstypelist",component:B}),r.a.createElement(C,{exact:!0,path:"/addgoodstype",component:J}),r.a.createElement(C,{exact:!0,path:"/goodstypeattribute",component:N}),r.a.createElement(C,{exact:!0,path:"/addgoodstypeattribute",component:U}),r.a.createElement(C,{exact:!0,path:"/addgoodscate",component:F}),r.a.createElement(C,{exact:!0,path:"/goodscate",component:q}),r.a.createElement(C,{exact:!0,path:"/goods",component:L}),r.a.createElement(C,{exact:!0,path:"/addgoods",component:$})))}}]),t}(a.Component),G=(n(238),O(function(){return Promise.all([n.e(0),n.e(2),n.e(5),n.e(20)]).then(n.bind(null,584))})),Q=u.a.Header,V=u.a.Content,X=u.a.Sider;var Y=function(){var e=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,t=Object(w.f)(function(e){var t=e.history;return r.a.createElement(v,{path:t.location.pathname})});return r.a.createElement(y.a,null,r.a.createElement(w.d,null,r.a.createElement(w.b,{exact:!0,path:"/",component:G}),r.a.createElement(u.a,null,r.a.createElement(Q,{className:"header"},"123"),r.a.createElement(u.a,null,r.a.createElement(X,{width:200,style:{background:"#fff"}},r.a.createElement(t,null)),r.a.createElement(u.a,null,r.a.createElement(V,{className:"App-contentMain",style:{background:"#fff",margin:25,height:e,padding:25}},r.a.createElement(z,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},29:function(e,t,n){"use strict";var a=n(35),r=n.n(a),o=n(120),c=n.n(o);r.a.defaults.retry=4,r.a.defaults.retryDelay=1e3;var l=r.a.create({baseURL:"",timeout:1e5});l.interceptors.request.use(function(e){return"dologin"===e.url&&(e.data=c.a.stringify(e.data),r.a.defaults.withCredentials=!0,r.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8"),e},function(e){Promise.reject(e)}),l.interceptors.response.use(function(e){return e.data},function(e){var t=e.config;return t&&t.retry?(t.__retryCount=t.__retryCount||0,t.__retryCount>=t.retry?Promise.reject(e):(t.__retryCount+=1,new Promise(function(e){setTimeout(function(){e()},t.retryDelay||1)}).then(function(){return r()(t)}))):Promise.reject(e)}),t.a=l},85:function(e,t,n){"use strict";n.d(t,"f",function(){return r}),n.d(t,"a",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"d",function(){return l}),n.d(t,"b",function(){return u}),n.d(t,"c",function(){return i});var a=n(29);function r(e){return Object(a.a)({url:"admin/Rolelist",method:"post",data:e})}function o(e){return Object(a.a)({url:"admin/AddRole",method:"post",data:e})}function c(e){return Object(a.a)({url:"admin/EditRole",method:"put",data:e})}function l(e){return Object(a.a)({url:"admin/DeleteRole",method:"delete",data:e})}function u(e){return Object(a.a)({url:"admin/auth",method:"post",data:e})}function i(e){return Object(a.a)({url:"admin/authlist",method:"get",params:e})}}},[[134,25,26]]]);
//# sourceMappingURL=main.762bfd41.chunk.js.map