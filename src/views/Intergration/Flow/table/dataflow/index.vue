<template>
  <div class="dataflow">
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="name" label="名称" width="180">
        <template slot-scope="scope">
          <span class="editName" @click="handleEdit(scope.row.flowType)">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flowType" label="类型" width="180"></el-table-column>
      <el-table-column prop="lastModifiedTime" label="修改时间"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import { modules1 } from "@/service";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: function() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  },
  computed: {},
  mounted() {
    modules1.dataFlow().then(res => {
      this.tableData = res.data.content;
    });
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    handleClick(row) {
      console.log(row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleEdit(type) {
      this.$router.push({path:"/layout/flow/flowchart", query: { type: type } });
    }
  }
};
</script>

<style lang="scss">
.dataflow {
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table {
    .editName {
      color: #2182e4;
      cursor: pointer;
    }
    .editName:hover {
      text-decoration: underline;
    }
  }
}
</style>
