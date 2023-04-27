<template>
  <div>
    <canvas ref="canvas" width="1000" height="800" style="border: 1px solid red;"></canvas>
  </div>
</template>

<script>
import { Tree } from './tree';
export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
      tree: new Tree(),
      canvas: null,
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas
    const array = new Array(10).fill(0).map(() => Math.floor(Math.random() * 20))
    console.log(array)
    array.forEach(element => {
      this.tree.add(element)
    });
    this.tree.draw(this.canvas)
  }
}
</script>

<style></style>
