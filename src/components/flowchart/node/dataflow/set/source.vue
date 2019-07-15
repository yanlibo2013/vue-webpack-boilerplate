<template>
  <div class="dataflow-sink">
    <el-form
      class="elForm"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :label-position="labelPosition"
    >
      <el-form-item label="节点名称" prop="newName">
        <el-tooltip class="priorityMes" placement="top" effect="dark">
          <div slot="content">["节点显示名称，最长100"]</div>
          <i class="el-icon-info"></i>
        </el-tooltip>
        <el-input v-model="ruleForm.newName" name="newName"></el-input>
      </el-form-item>
      <el-tabs v-model="activeName2" type="card" :before-leave="leaveTab" @tab-click="handleClick">
        <el-tab-pane
          v-for="(ns, index) in nodeSetTab"
          :key="ns.key"
          :name="ns.title"
          :disabled="disable[index]"
        >
          <div slot="label">
            <i :class="ns.icon"></i>
            {{ns.title}}
          </div>

          <div v-if="index!=0">{{ns.title}}</div>
          <el-form-item label="数据集" v-else>
            <el-tooltip
              class="item"
              effect="dark"
              content="1.数据集名称,从资源目录选择或编辑创建 2.格式为字符串：字符/数字/下划线/-/的组合"
              placement="top"
            >
              <i class="parIcon el-icon-warning"></i>
            </el-tooltip>
            <el-input placeholder="（必填）">
              <el-button slot="append" icon="icon iconfont icon-ir-search" name="dataSetInq"></el-button>
            </el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: function() {
    return {
      nodeSetTab: [
        { title: "参数", name: "parameter", icon: "fa fa-gear" },
        { title: "输出", name: "output", icon: "fa fa-sign-out" }
      ],
      disable: [false, false, false, false, false, false],
      activeName2: "",
      labelPosition: "left",
      ruleForm: {
        //定义表单验证字段
        newName: "" //节点名称
      },
      rules: {
        //节点表单验证
        newName: [
          //新名称验证
          { required: true, message: "节点名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "节点显示名称，最长100",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  mounted() {},
  beforeCreate() {},
  created() {
    console.log("set source");
  },
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    leaveTab() {},
    handleClick(tab, event) {}
  }
};
</script>

<style lang="scss" scoped>
.dataflow-sink {
  .elForm {
    margin: 0px 0px 10px 0px;
  }
  .sign {
    margin: 0px;
    color: red;
    padding: 0px;
    font-size: 8px;
  }
  .priorityMes {
    position: absolute;
    top: 13px;
    color: #333;
    left: -20px;
  }

  .parIcon {
    position: absolute;
    left: -20px;
    top: 14px;
  }
}
</style>
