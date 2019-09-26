<template>
  <div class="jsplumbchart">
    <div class="editor-bar">
      <el-button type="info" @click="addGroup">add Group</el-button>
      <el-button type="info" @click="saveData">保存</el-button>
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
          <jsplumbchartgroup
            :data="{groupData:groupData,jsPlumb:jsPlumb}"
            @modifyGroupData="modifyGroupData"
          ></jsplumbchartgroup>
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

import jsplumbchart from "@/components/jsplumbchart/index";

import dataflow from "@/components/flowchart/node/dataflow/index";
import workflow from "@/components/flowchart/node/workflow/index";
import streamflow from "@/components/flowchart/node/streamflow/index";

import { flowData } from "mock/data/jsplumbchart/flowData.js";
import { stepData } from "mock/data/jsplumbchart/stepData.js";
import jsPlumb from "static/jsPlumb/jsPlumb-2.2.3-min";
// import plumbGather from "jsplumb";
import jsplumbchartgroup from "@/components/flowchart/ChartGroup/index";
import { link } from "fs";

export default {
  components: {
    rightaside,
    jsplumbchart,
    jsplumbchartgroup
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
      jsPlumb: jsPlumb,
      groupData: []
      // jsPlumb: plumbGather.jsPlumb
    };
  },

  //
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    addGroup() {
      let selectedStep = this.getSelectedStep(this.flowData);
      console.log("selectedStep", selectedStep);
      let selectedlinks = this.getSelectedLinks(selectedStep, this.links);
      console.log("selectedlinks", selectedlinks);
    },
    getSelectedLinks(selectedStep, links) {
      let result = [];
      _.forEach(links, link => {
        if (
          this.isSource(selectedStep, link.source) &&
          this.isTarget(selectedStep, link.target)
        ) {
          result.push(link);
        }
      });

      return result;
    },
    find(data, id) {
      return _.find(data, item => {
        return item.id == id;
      });
    },
    isSource(selectedStep, sourceId) {
      return this.find(selectedStep, sourceId);
    },
    isTarget(selectedStep, targetId) {
      return this.find(selectedStep, targetId);
    },
    getSelectedStep(val) {
      return _.filter(val, item => {
        return item.isSelected;
      });
    },
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
      return;

      this.flowData = [
        {
          id: "rtc_multioutput_1",
          name: "rtc_multioutput",
          type: "multioutput",
          stepSettings: { condition: "aaaa" },
          inputConfigurations: {
            input: [
              {
                column: "kpi_time",
                type: "string",
                alias: "kpi_time",
                description: ""
              }
            ]
          },
          outputConfigurations: {
            output1: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output2: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output3: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output4: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output5: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output6: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output7: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ],
            output8: [
              { column: "kpi_time", type: "string", alias: "", description: "" }
            ]
            // output9: [
            //   { column: "kpi_time", type: "string", alias: "", description: "" }
            // ],
            // output10: [
            //   { column: "kpi_time", type: "string", alias: "", description: "" }
            // ],
            // output11: [
            //   { column: "kpi_time", type: "string", alias: "", description: "" }
            // ],
            // output12: [
            //   { column: "kpi_time", type: "string", alias: "", description: "" }
            // ],
            // output13: [
            //   { column: "kpi_time", type: "string", alias: "", description: "" }
            // ]
          },
          x: 307,
          y: 404
        },
        ...this.flowData
      ];
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
    modifyGroupData(val) {
      this.groupData = _.map(this.groupData, item => {
        if (item.id == val.id) {
          return {
            ...item,
            nodeType: {
              left: val.x,
              top: val.y
            }
          };
        } else {
          return item;
        }
      });
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
      //console.log(" handleDrop(val) {", va);
      if (val.drawIcon && val.drawIcon.type == "group") {
        let groupItem = val.drawIcon;
        let groupLabel = groupItem.id + (this.groupData.length + 1);
        this.groupData.push({
          //id:jsPlumbUtil.uuid(),
          id: groupLabel,
          name: groupLabel,
          type: groupItem.type,
          nodeStyle: {
            top: event.offsetY + "px",
            left: event.offsetX + "px"
          }
        });
        return;
      }

      let item = val.drawIcon ? this.getCurrentNode(val) : val;
      this.flowData.push(item);
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
    },
    saveData() {
      console.log("step", this.flowData);
      console.log("links", this.links);
      console.log("group", this.groupData);
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

        // ////////////////////////node style begin///////////////////
        .designIconBig {
          height: 70px;
          width: 150px;
          margin: 0 auto;
          padding: 12px;
          box-sizing: border-box;
          box-shadow: 0 10px 18px -9px rgba(0, 0, 0, 0.5);
          background: #ffffff;
          text-align: center;
          position: absolute;
          margin-right: 15px;
          margin-bottom: 20px;
          cursor: pointer;
          float: left;
        }

        .designIconBig i {
          float: none !important;
          position: absolute;
          left: 5px;
          top: 8px;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 30px !important;
        }

        .designIconBig h4 {
          position: absolute;
          top: 5px;
          left: 38px;
          margin: 0px;
          padding: 0px;
          width: 110px;
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .designIconBig h5 {
          position: absolute;
          top: 25px;
          left: 38px;
          margin: 0px;
          padding: 0px;
          width: 110px;
          text-align: left;
          font-size: 12px;
          font-weight: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .designIconBig #removeDes {
          position: absolute;
          top: 46px;
          right: 15px;
          font-size: 14px;
          color: #b9c0d8;
          margin: 0px;
          padding: 0px;
        }

        .designIconBig #copeDes {
          position: absolute;
          top: 45px;
          right: 35px;
          font-size: 14px;
          color: #b9c0d8;
          margin: 0px;
          padding: 0px;
        }
        .designIconBig #pitchOnDes {
          position: absolute;
          top: 47px;
          right: 60px;
          font-size: 14px;
          color: #b9c0d8;
          margin: 0px;
          padding: 0px;
        }
        .desingIconBig #markDes {
          position: absolute;
          top: 45px;
          right: 20px;
          font-size: 14px;
          color: #b9c0d8;
          margin: 0px;
          padding: 0px;
        }

        .t1Style {
          border: 2px solid #48c038;
          color: #48c038;
          border-radius: 2px;
        }
        .t2Style {
          border: 2px solid #4586f3;
          color: #4586f3;
          border-radius: 2px;
        }
        .t3Style {
          border: 2px solid #8367df;
          color: #8367df;
          border-radius: 2px;
        }

        .redStyle {
          border: 2px solid red;
        }
        .designIconBg {
          position: absolute;
          color: #ffffff !important;
        }

        .designIconBig #removeDes:hover {
          color: #ff4e4e;
        }

        .designIconBig #copeDes:hover {
          color: #ff4e4e;
        }

        .designIconBig #pitchOnDes:hover {
          color: #ff4e4e;
        }

        // ////////////////////////node style end///////////////////
      }
    }
    .aside {
      width: 250px;
    }
  }
}
</style>
