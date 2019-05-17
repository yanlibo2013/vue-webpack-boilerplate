<template>
  <header class="v-header">
    <!-- <el-menu
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
    </el-menu>-->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <el-submenu :index="item.path" v-for="(item,index) in menuData" :key="index">
        <template slot="title">{{item.name}}</template>
        <el-menu-item
          :index="sub.path"
          v-for="(sub,subindex) in item.children"
          :key="subindex"
        >{{sub.name}}</el-menu-item>
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
      activeIndex2: "1",
      menuData: [
        {
          name: "数据分析",
          path: "analyst ",
          children: [
            {
              name: "流程管理",
              path: "flow"
            }
          ]
        },
        {
          name: "数据集成",
          path: "integration",
          children: [
            {
              name: "资源目录",
              path: "source"
            },
            {
              name: "文件管理",
              path: "file"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      this.$router.push("/layout/" + key);
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