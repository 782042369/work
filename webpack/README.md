### 安装 
```
npm i / cnpm i
```
### 开发模式 
```
npm  run dev
```
### 打包
```
 npm run build
```
### node版本 >6 
### 项目使用了layer的弹窗和 layuidata 时间组件
### 目录结构
```
├─build  
 ├─webpack.base.conf.js  webpack基础配置  
 ├─webpack.dev.conf.js   webpack开发模式配置  
 ├─webpack.prod.conf.js  webpack生产模式配置  
├config  
 └─index.js  配置文件参数  
├─src        示例文件（受理系统）  
 ├─common  
  ├─images 公用img文件
    ├─font  字体图标文件  
  └─js 公用js文件  
    ├─font  字体图标文件  
    ├─servicecomponent 组件JS  
     ├─animate      动画组件JS  
     ├─dialog       dialog组件  
     └─paging       分页组件  
    ├─api           请求接口JS  
    ├─common        公用JS  
    └─http          请求JS 
 ├─helpers handlebars 模板引擎扩展helpers方法（可自定义扩展）  
  └─file.js             独立引用文件配置  
 ├─page 页面  
  └─index 例子，内文件名同文件夹名
   ├─index.hbs     handlebars页面文件  
   ├─index.js      脚本文件  
   ├─index.plan.js html-webpack-plugin模板入口（引用part中的模块）  
   └─index.scss      
  └─appraise        我要评论  
  └─goappraise      办件登陆到评论  
  └─gocomplaints    我要投诉 
  └─gosuggest       我要建议 
  └─personalaffair  事项列表页面文件 
  └─suggest         建议投诉公开 
├─part  模块  
 └─footer  公用模块  
  ├─footer.hbs   模块文件（在.plan.js被引用）  
  ├─footer.js    模块脚本  （在common/js/被引用）  
  └─footer.scss  模块样式（在common/scss/被引用）  
├─.babelrc  
├─.eslintignore  eslint检测忽略文件  
├─.eslintrc      eslint代码检测配置
├─.gitignore  
├─package.json  
├─webpack.config.js  
└─postcss.config.js  
```