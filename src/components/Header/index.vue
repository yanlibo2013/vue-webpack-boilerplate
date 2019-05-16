<template>
  <header class="v-header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-submenu index="2">
        <template slot="title">Module1</template>
        <el-menu-item index="module1/module1-1">Module1-1</el-menu-item>
        <el-menu-item index="module1/module1-2">Module1-2</el-menu-item>
        <el-menu-item index="module1/module1-3">Module1-3</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  computed: {},
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      this.$router.push("/" + key);
    }
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {}
};
</script>

<style lang="scss">
.v-header {
  height: 55px;
  background: #333;
}
</style>