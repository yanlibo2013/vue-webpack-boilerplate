<template>
  <div class="home">
    <!-- <sidebar class="sidebar-container"/> -->
    <div class="content">
      <h1>module1-1-1-1</h1>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data: function() {
    return {}
  },
  computed: {},
  mounted() {
    console.log("mounted module1-1-1-1");
  },
  beforeCreate() {
    console.log("beforeCreate module1-1-1-1");
  },
  created() {
     console.log("created module1-1-1-1");
  },
  beforeMount() {
     console.log("beforeMount module1-1-1-1");
  },
  beforeUpdate() {
     console.log("beforeUpdate module1-1-1-1");
  },
  updated() {
     console.log("updated module1-1-1-1");
  },
  beforeDestroy() {
     console.log("beforeDestroy module1-1-1-1");
  },
  destroyed() {
    console.log("destroyed module1-1-1-1");
  },
  activated(){
       console.log("activated module1-1-1-1");
  },
  deactivated(){
       console.log("deactivated module1-1-1-1");
  },
  methods: {}
}
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
