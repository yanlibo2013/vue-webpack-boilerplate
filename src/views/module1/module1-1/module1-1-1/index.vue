<template>
  <div class="home">
    <!-- <sidebar class="sidebar-container"/> -->
    <div class="content">
      <h1>module1-1-1</h1>
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
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
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
