(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{284:function(e,t,a){"use strict";t.a=function(e){if(window.location.search){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t),n="";return null!=a&&(n=unescape(a[2])),n}return!1}},394:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return r}),a.d(t,"d",function(){return c}),a.d(t,"c",function(){return l}),a.d(t,"e",function(){return o});var n=a(29);function s(e){return Object(n.a)({url:"admin/Accesslist",method:"post",data:e})}function r(e){return Object(n.a)({url:"admin/AddAccess",method:"post",data:e})}function c(e){return Object(n.a)({url:"admin/EditAccess",method:"put",data:e})}function l(e){return Object(n.a)({url:"admin/DeleteAccess",method:"delete",data:e})}function o(e){return Object(n.a)({url:"admin/FindAccessList",method:"get",data:e})}},568:function(e,t,a){"use strict";a.r(t);a(251);var n=a(252),s=a.n(n),r=(a(365),a(366)),c=a.n(r),l=(a(359),a(362)),o=a.n(l),i=(a(125),a(81)),u=a.n(i),d=a(18),m=a(19),p=a(22),h=a(20),f=a(21),b=(a(356),a(268)),g=a.n(b),E=a(1),O=a.n(E),j=a(394),v=a(284),y=g.a.Option,_=function(e){function t(e){var a;return Object(d.a)(this,t),(a=Object(p.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e)if(t.sort=Number(t.sort),Object(v.a)("id")){var a={id:Object(v.a)("id")};Object(j.d)(Object.assign(t,a)).then(function(e){console.log(e),u.a.success(e.message)}).catch(function(e){u.a.error(e.message),console.log(e)})}else Object(j.b)(t).then(function(e){console.log(e),u.a.success(e.message)}).catch(function(e){console.log(e),u.a.error(e.message)})})},a.renderOptions=function(){return console.log("this.state.accessdata: ",a.state.accessdata),a.state.accessdata.map(function(e){return O.a.createElement(y,{key:e._id,value:e._id},e.module_name)})},a.state={title:"",accessdata:[],roledata:[]},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"getlist",value:function(){var e=this;Object(j.a)({module_id:0}).then(function(t){1===t.status&&(e.setState({accessdata:t.data}),console.log("this.state.accessdata: ",e.state.accessdata))}).catch(function(e){console.log("err: ",e)})}},{key:"componentDidMount",value:function(){var e=this;this.getlist(),Object(v.a)("id")?(this.setState({title:"\u4fee\u6539"}),Object(j.a)({_id:Object(v.a)("id")}).then(function(t){var a=t.data[0],n=a.action_name,s=a.description,r=a.module_id,c=a.module_name,l=a.sort,o=a.status,i=a.type,u=a.url;e.props.form.setFieldsValue({action_name:n,description:s,module_id:r,module_name:c,sort:l,status:o,type:i,url:u})}).catch(function(e){console.log("err: ",e)})):this.setState({title:"\u589e\u52a0"})}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return O.a.createElement(c.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),O.a.createElement("h1",null,this.state.title,"\u6743\u9650"),O.a.createElement(c.a.Item,{label:"\u6a21\u5757\u540d\u79f0"},e("module_name",{rules:[{required:!0,message:"Please input your title!"}]})(O.a.createElement(o.a,{placeholder:"\u8bf7\u8f93\u5165"}))),O.a.createElement(c.a.Item,{label:"\u8282\u70b9\u540d\u79f0"},e("type",{rules:[{required:!0,message:"Please input your description!"}]})(O.a.createElement(g.a,{onChange:this.handleChange},O.a.createElement(y,{key:1,value:1},"\u6a21\u5757"),O.a.createElement(y,{key:2,value:2},"\u83dc\u5355"),O.a.createElement(y,{key:3,value:3},"\u64cd\u4f5c")))),O.a.createElement(c.a.Item,{label:"\u64cd\u4f5c\u540d\u79f0"},e("action_name")(O.a.createElement(o.a,{placeholder:"\u8bf7\u8f93\u5165"}))),O.a.createElement(c.a.Item,{label:"\u64cd\u4f5c\u5730\u5740"},e("url")(O.a.createElement(o.a,{placeholder:"\u8bf7\u8f93\u5165"}))),O.a.createElement(c.a.Item,{label:"\u6240\u5c5e\u6a21\u5757"},e("module_id",{rules:[{required:!0,message:"Please input your description!"}]})(O.a.createElement(g.a,{onChange:this.handleChange},O.a.createElement(y,{key:0,value:0},"\u9876\u7ea7\u6a21\u5757"),this.renderOptions()))),O.a.createElement(c.a.Item,{label:"\u6392\u5e8f"},e("sort",{rules:[{required:!0,message:"Please input your description!"}]})(O.a.createElement(o.a,{placeholder:"\u8bf7\u8f93\u5165"}))),O.a.createElement(c.a.Item,{label:"\u63cf\u8ff0"},e("description",{rules:[{required:!0,message:"Please input your description!"}]})(O.a.createElement(o.a,{placeholder:"\u8bf7\u8f93\u5165"}))),O.a.createElement(c.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},O.a.createElement(s.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4")))}}]),t}(E.Component),w=c.a.create({name:"register"})(_);t.default=w}}]);
//# sourceMappingURL=AddAccess.538990c1.chunk.js.map