# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### GraphQl
```
graphql 目录下，有 4 种代码 
  1 common 全局类型定义
  2 query 查询代码
  3 mutation 更新操作代码
  4 业务 实现代码
    4.1 connector 连接数据服务
    4.2 resolver 类型实现
    4.3 schema 定义
```
