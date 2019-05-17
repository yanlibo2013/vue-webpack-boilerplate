<template>
  <div class="scrollbar-wrapper">
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
    />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      data: [
        // {
        //   label: 'module1-1-1',
        //   children: [
        //     {
        //       label: 'module1-1-1-1',
        //       children: [
        //         {
        //           label: 'module1-1-1-1-1'
        //         }
        //       ]
        //     }
        //   ]
        // }
        {
          label: "根目录",
          id:"1",
          children: [
            {
              label: "子节点1",
              id:"1-1",
              children: [
                {
                  label: "子节点1-1",
                  id:"1-1-1"
                }
              ]
            }
          ]
        },
        {
          label:"其他用户",
          id:"2"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label",
        
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$router.push("/layout/flow/id");
    }
  }
};
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
