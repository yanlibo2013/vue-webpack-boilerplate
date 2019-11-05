<template>
  <div class="home">
    <!-- <sidebar class="sidebar-container"/> -->
    <div class="content">
      <h1>资源目录</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { modules1 } from "@/service";
export default {
  components: {},
  data: function() {
    return {};
  },
  computed: {},
  mounted() {
    console.log("module1-1-1");
  },
  beforeCreate() {
    console.log("beforeCreate module1-1-1");
  },
  created() {
    console.log("created module1-1-1");
  },
  beforeMount() {
    console.log("beforeMount module1-1-1");
  },
  beforeUpdate() {
    console.log("beforeUpdate module1-1-1");
  },
  updated() {
    console.log("updated module1-1-1");
  },
  beforeDestroy() {
    console.log("beforeDestroy module1-1-1");
  },
  destroyed() {
    console.log("destroyed module1-1-1");
  },
  activated() {
    console.log("activated module1-1-1");
    let self=this;
    modules1.list({ name: "ylb" }).then(res => {
      console.log("/////////////////////////////////");
      console.log("res", res.data);
      //self.getNavData(res.data.content);
    });

    self.getNavData([]);
  },
  deactivated() {
    console.log("deactivated module1-1-1");
  },
  methods: {
     ...mapActions(["getNavData"]),
  }
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
