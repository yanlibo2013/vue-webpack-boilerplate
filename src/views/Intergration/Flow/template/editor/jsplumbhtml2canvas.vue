<template>
  <div class="jsplumbchart">
    <div class="editor-bar">
      <el-button type="info" @click="initData">流程</el-button>
      <el-button type="info" @click="reset">清空</el-button>
    </div>
    <div class="editor-container">
      <div class="main">
        <drop class="drop-workplace" @drop="handleDrop" id="workplace">
          <jsplumbchart
            :data="{stepData:flowData,links:this.links,jsPlumb:jsPlumb}"
            @modifyChart="modifyChart"
            @nodedblClick="nodedblClick"
            @handleDrop="handleDrop"
            ref="jsplumbchart"
          ></jsplumbchart>
        </drop>
      </div>
      <div class="aside">
        <rightaside :stepList="stepList"></rightaside>
      </div>
    </div>

    <el-dialog
      :title="nodeType+'设置'"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      v-dialog-drag
      @open="showDailog"
      width="70%"
      custom-class="custom-class-dialog"
    >
      <component :is="dialogComponent" :nodeType="nodeType"></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";
import rightaside from "./rightaside/jsplumbchart/index";
import { modules1 } from "@/service";

import jsplumbchart from "@/components/jsplumbhtml2canvas/index";

import dataflow from "@/components/flowchart/node/dataflow/index";
import workflow from "@/components/flowchart/node/workflow/index";
import streamflow from "@/components/flowchart/node/streamflow/index";

import { flowData } from "mock/data/jsplumbchart/flowData.js";
import { stepData } from "mock/data/jsplumbchart/stepData.js";
import jsPlumb from "static/jsPlumb/jsPlumb-2.2.3-min";
export default {
  components: {
    rightaside,
    jsplumbchart
  },
  data() {
    return {
      jsplumbInstance: null,
      flowType: "",
      flowData: {},
      links: [],
      self: this,
      dialogVisible: false,
      dialogComponent: "",
      nodeType: "",
      newflowdata: [],
      stepList: [],
      jsPlumb: jsPlumb
    };
  },

  //
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    showDailog() {
      if (this.flowType == "dataflow") {
        this.dialogComponent = dataflow;
      }
      if (this.flowType == "streamflow") {
        this.dialogComponent = streamflow;
      }
      if (this.flowType == "workflow") {
        this.dialogComponent = workflow;
      }
    },
    handleClose(done) {
      done();
      this.dialogComponent = "";
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    showStepDialog(val) {
      this.dialogVisible = true;
    },
    initData() {
      this.stepList = this.getLeftAsideData(
        stepData,
        _.uniq(this.getGroupData(stepData))
      );

      let res = _.cloneDeep(flowData);

      this.flowData = res.steps;
      this.flowType = res.flowType;
      this.links = res.links;

      // this.flowData = [];
      // this.links = [];
    },
    reset() {
      this.flowData = [];
      this.links = [];
      this.$refs.jsplumbchart.reset();
    },
    getCurrentNode(data) {
      return {
        id: data.drawIcon.id + "_" + (this.flowData.length + +1),
        name: data.drawIcon.name,
        type: data.drawIcon.type,
        x: event.offsetX,
        y: event.offsetY,
        stepSettings: data.drawIcon.stepSettings
      };
    },
    modifyChart(val) {
      this.flowData = val.stepData;
      this.links = val.links;
    },
    nodedblClick(val) {},
    getLeftAsideData(data, group) {
      return _.map(group, item => {
        return {
          group: item,
          thisIcon: _.compact(this.getIconData(data, item))
        };
      });
    },
    getGroupData(val) {
      return _.map(val, item => {
        return item.tags[0];
      });
    },
    getIconData(data, val) {
      return _.map(data, item => {
        if (item.tags[0] == val) {
          return item;
        }
      });
    },
    handleDrop(val) {
      this.flowData.push(val.drawIcon ? this.getCurrentNode(val) : val);
    },
    getCurrentNode(data) {
      let node = {
        id: data.drawIcon.id + "_" + (this.flowData.length + +1),
        name: data.drawIcon.name,
        type: data.drawIcon.type,
        x: event.offsetX,
        y: event.offsetY,
        stepSettings: data.drawIcon.stepSettings
      };

      let outputConfigurations = {
        outputConfigurations: {
          output: []
        }
      };

      let inputConfigurations = {
        inputConfigurations: {
          input: []
        }
      };

      switch (data.drawIcon.type) {
        case "source":
          return {
            ...node,
            ...outputConfigurations
          };
        case "filter":
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };

        case "aggregate":
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };
        case "transform":
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };
        case "sql":
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };
        case "multioutput":
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };
        case "sink":
          return {
            ...node,
            ...inputConfigurations
          };
        default:
          "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.jsplumbchart {
  position: fixed;
  top: 60px;
  left: 200px;
  // right: -200px;
  bottom: 0;
  width: calc(100vw - 200px);
  display: flex;
  flex-direction: column;

  .editor-bar {
    height: 50px;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .editor-container {
    display: flex;
    width: 100%;
    flex: 1 1 auto;
    .main {
      flex: 1 1 auto;
      background-image: url("../../../../../assets/editor/designBg.png");
      .drop-workplace {
        width: 100%;
        height: 100%;
        position: relative;
        // top: 0;
        // left: 0;
        //   background-image: url("../assets/img/designBg.png");
      }
    }
    .aside {
      width: 250px;
    }
  }
}
</style>
