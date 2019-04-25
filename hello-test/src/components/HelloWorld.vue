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
      <li :key="item.id" v-for="item in list">
        <button @click="handleDelList(item)" class="deletebtn">-</button>
        <input
          :class="{'edit':!item.readonly}"
          :readonly="item.readonly"
          @blur="item.readonly=true"
          @dblclick="item.readonly = !item.readonly"
          @keyup="handleEditList(todo)"
          class="listinput"
          placeholder="请修改todolsit"
          type="text"
          v-model="item.text"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoval: '',
      // todoval: '',
      list: [
        {
          id: Math.random(),
          text: 'css',
          readonly: true
        },
        {
          id: Math.random(),
          text: 'js',
          readonly: true
        }
      ]
    };
  },
  methods: {
    // 增加数据
    handleAddList(e) {
      if (e.keyCode === 13) {
        this.list.push({
          id: Math.random(),
          text: this.todoval
        });
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
}
[readonly] {
  outline-color: red;
}
input {
  margin-left: 20px;
  border: none;
  outline-color: yellowgreen;
}
</style>
