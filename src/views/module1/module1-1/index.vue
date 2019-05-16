<template>
  <div class="home">
    <sidebar class="sidebar-container"/>
    <div class="content">
      <!-- <h1>module1-1</h1> -->
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
        <!-- <router-view/> -->
      </transition>
    </div>
  </div>
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
  mounted() {
  
  },
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
.home {
  // background: red;
  display: flex;
  .sidebar-container {
    flex: none;
  }

  .content {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
