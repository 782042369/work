<template>
  <div id="app">
    <div :key="item.active" v-for="item in secondmu">
      {{item.name}}
      <li :key="list.actie" @click="addList(list)" v-for="list in item.data">{{list.dataname}}</li>
    </div>
    <ul>
      <li :key="list.actie" v-for="list in menulist">{{list.dataname}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      secondmu: [
        {
          name: '管理第配置',
          active: '1',
          data: [
            { dataname: '组织架构', actie: '1-1' },
            { dataname: '角色管理', actie: '1-2' },
            { dataname: '权限分配', actie: '1-3' },
            { dataname: '操作日志', actie: '1-4' }
          ]
        },
        {
          name: '维护管理',
          active: '2',
          data: [{ dataname: '全局数据维护', actie: '2-1' }]
        }
      ],
      menulist: []
    };
  },
  methods: {
    addList(item) {
      console.time();
      let index = this.menulist.indexOf(item);
      index > -1 && this.menulist.splice(index, 1);
      this.menulist.unshift(item);
      console.timeEnd();
    }
  }
};
</script>

<style >
li {
  margin: 2vw;
  padding: 2vw;
  border: 1px solid;
  cursor: pointer;
}
ul {
  display: flex;
}
li {
  transition: all 0.2s;
}
</style>
