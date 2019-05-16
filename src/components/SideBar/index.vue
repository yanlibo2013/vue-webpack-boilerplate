<template>
  <div class="scrollbar-wrapper">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      data: [
        {
          label: 'module1-1-1',
          children: [
            {
              label: 'module1-1-1-1',
              children: [
                {
                  label: 'module1-1-1-1-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$router.push("/module1/module1-1/"+data.label);

    }
  }
}
</script>
<style lang="scss">
.scrollbar-wrapper {
  // background: red;
  // display: flex;
  // .sidebar-container {
  //   flex: none;
  // }

  // .content {
  //   flex: auto;
  //   display: flex;
  //   flex-direction: column;
  // }
}
</style>
