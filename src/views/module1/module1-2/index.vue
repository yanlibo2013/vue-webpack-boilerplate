<template>
  <div class="home">
    <!-- <sidebar class="sidebar-container"/> -->
    <div class="content">
      <h1>module1-2</h1>
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
    console.log("mounted module1-2");
  },
  beforeCreate() {
    console.log("beforeCreate module1-2");
  },
  created() {
     console.log("created module1-2");
  },
  beforeMount() {
     console.log("beforeUpdate module1-2");
  },
  beforeUpdate() {
     console.log("beforeUpdate module1-2");
  },
  updated() {
     console.log("updated module1-2");
  },
  beforeDestroy() {
     console.log("beforeDestroy module1-2");
  },
  destroyed() {
     console.log("destroyed module1-2");
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
