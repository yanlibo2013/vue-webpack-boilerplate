<template>
  <el-container class="container">
    <el-aside width="200px">
      <sidebar class="sidebar-container"/>
    </el-aside>
    <el-main>
      <transition name="fade-transform" mode="out-in">
        <!-- <keep-alive>
          <router-view/>
        </keep-alive>-->
        <router-view/>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "@/components/SideBar/index";
export default {
  components: {
    Sidebar
  },
  data: function() {
    return {};
  },
  computed: {},
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {
    console.log("destroyed module1-1");
  },
  methods: {}
};
</script>

<style lang="scss">
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
