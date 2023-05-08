<template>
  <div>
    <table>
      <tr>
        <td>新增</td>
        <td> <input type="number" @keydown="add"></td>
        <td>删除</td>
        <td><input type="number" @keydown="remove"></td>
      </tr>
    </table>
    <canvas ref="canvas" width="1000" height="800" style="border: 1px solid red;"></canvas>
  </div>
</template>

<script>
import { Tree } from './AVLTree';
export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
      tree: null

    }
  },
  mounted() {
    this.tree = new Tree(this.$refs.canvas)
    const array = new Array(20).fill(0).map(() => Math.floor(Math.random() * 100))
    console.log(array)
    array.forEach(element => {
      this.tree.add(element)
    });
  },
  methods: {
    add(e) {
      if (e.keyCode === 13) {
        console.log(e.target.value)
        this.tree.add(e.target.value)
        e.target.value = ""
      }
    },
    remove(e) {
      if (e.keyCode === 13) {
        console.log(e.target.value)
        this.tree.remove(e.target.value)
        e.target.value = ""
      }
    }
  }
}
</script>

<style></style>
