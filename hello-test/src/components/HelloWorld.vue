<template>
  <div>
    <h1>TOdolsit</h1>
    <div>
      <input
        @keyup="handleAddList"
        class="newtodo"
        placeholder="请输入todolsit"
        type="text"
        v-model="todoval"
      >
    </div>
    <ul class="todolist">
      <transition-group appear tag="ul">
        <li :key="item.id" v-for="item in list">
          <button @click="handleDelList(item)" class="deletebtn">-</button>
          <input
            :class="{'edit':!item.readonly}"
            :readonly="item.readonly"
            @blur="item.readonly=true"
            @dblclick="item.readonly = !item.readonly"
            class="listinput"
            placeholder="请修改todolsit"
            type="text"
            v-model="item.text"
          >
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoval: '',
      list: []
    };
  },
  created() {
    if (localStorage.getItem('todolist')) {
      this.list = JSON.parse(localStorage.getItem('todolist'));
    }
  },
  methods: {
    // 增加数据
    handleAddList(e) {
      if (e.keyCode === 13) {
        if (this.todoval === '') {
          return alert('请输入你想干哈！！');
        }
        this.list.push({
          id: new Date().getTime(),
          text: this.todoval,
          readonly: true
        });
        localStorage.setItem('todolist', JSON.stringify(this.list));
        this.todoval = '';
      }
    },
    // 删除数据
    handleDelList(item) {
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
    }
  }
};
</script>

<style  lang='scss' scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
  height: 40px;
  display: flex;
  align-items: center;
}
[readonly] {
  outline-color: red;
}
li input {
  margin-left: 20px;
  border: none;
  outline-color: yellowgreen;
}
.v-enter,
.v-lerve-to {
  opacity: 0;
  transform: translateY(80px);
}
.v-enter-active,
.v-lerve-active {
  transition: all 0.2s ease;
}
/*添加进场效果*/

.v-move {
  transition: all 0.4s ease;
}
.v-leave-active {
  position: absolute;
}
</style>
