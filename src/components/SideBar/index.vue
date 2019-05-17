<template>
  <div class="scrollbar-wrapper">
    <el-tree
      :data="data"
       show-checkbox
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :default-expanded-keys="[5]"
      :default-checked-keys="[5]"
      node-key="id"
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
          id: 1,
          children: [
            {
              label: "子节点1",
              id: 3,
              children: [
                {
                  label: "子节点1-1",
                  id: 4
                },
                 {
                  label: "子节点1-2",
                  id: 5
                }
              ]
            }
          ]
        },
        {
          label: "其他用户",
          id: 2
        },
        {
          label: "flow",
          id: 6
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$router.push(data.id==6?"/layout/flow/editor":"/layout/flow/list/" + data.id);
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

  .el-tree{
    min-height: calc(100vh - 50px);
  }
 
}
</style>
