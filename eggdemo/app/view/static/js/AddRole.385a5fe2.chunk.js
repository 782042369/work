(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{284:function(e,t,a){"use strict";t.a=function(e){if(window.location.search){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t),n="";return null!=a&&(n=unescape(a[2])),n}return!1}},571:function(e,t,a){"use strict";a.r(t);a(251);var n=a(252),s=a.n(n),r=(a(365),a(366)),i=a.n(r),c=(a(125),a(81)),o=a.n(c),l=a(18),u=a(19),p=a(22),m=a(20),d=a(21),f=(a(359),a(362)),h=a.n(f),b=a(1),g=a.n(b),j=a(85),O=a(284),w=h.a.TextArea,v=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(p.a)(this,Object(m.a)(t).call(this,e))).handleSubmit=function(e){e.preventDefault(),a.props.form.validateFieldsAndScroll(function(e,t){if(!e)if(Object(O.a)("id")){var a={id:Object(O.a)("id")};Object(j.e)(Object.assign(t,a)).then(function(e){console.log(e),o.a.success(e.message)}).catch(function(e){o.a.error(e.message),console.log(e)})}else Object(j.a)(t).then(function(e){1===e.status?o.a.success(e.message):o.a.error(e.message)}).catch(function(e){console.log(e),o.a.error(e.message)})})},a.state={confirmDirty:!1,title:""},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;Object(O.a)("id")?(this.setState({title:"\u4fee\u6539"}),Object(j.f)({id:Object(O.a)("id")}).then(function(t){var a=t.data[0],n=a.title,s=a.description;e.props.form.setFieldsValue({title:n,description:s})}).catch(function(e){console.log("err: ",e)})):this.setState({title:"\u589e\u52a0"})}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return g.a.createElement(i.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}},{onSubmit:this.handleSubmit}),g.a.createElement("h1",null,this.state.title,"\u89d2\u8272"),g.a.createElement(i.a.Item,{label:"\u89d2\u8272\u540d\u79f0"},e("title",{rules:[{required:!0,message:"Please input your title!"}]})(g.a.createElement(h.a,{placeholder:"\u8bf7\u8f93\u5165"}))),g.a.createElement(i.a.Item,{label:"\u89d2\u8272\u63cf\u8ff0"},e("description",{rules:[{required:!0,message:"Please input your description!"}]})(g.a.createElement(w,{placeholder:"\u8bf7\u8f93\u5165"}))),g.a.createElement(i.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},g.a.createElement(s.a,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4")))}}]),t}(b.Component),E=i.a.create({name:"register"})(v);t.default=E}}]);
//# sourceMappingURL=AddRole.385a5fe2.chunk.js.map