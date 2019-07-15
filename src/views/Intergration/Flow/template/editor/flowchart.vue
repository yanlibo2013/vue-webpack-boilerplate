<template>
  <div class="flowchart">
    <div class="editor-bar">
      <el-button type="info" @click="initData">流程</el-button>
      <el-button type="info" @click="reset">清空</el-button>
    </div>
    <div class="editor-container">
      <div class="main">
        <drop class="workplace editor" @drop="handleDrop" id="workplace">
          <div
            v-for="(data,index) in flowData"
            :id="data.id"
            :key="index"
            :class="'designIconBig '+setClass(nodeClass(data.type))"
            :data-sign="data.name"
            :data-index="addEndpointToNode(data.type,data.id,jsplumbInstance, self,links)"
            :data-type="data.type"
            :style="'left:'+data.x+'px;top:'+data.y+'px;position:absolute;margin:0'"
            @dblclick="showStepDialog(data.type)"
          >
            <i class="icon iconfont icon-ir-designIconBg designIconBg"></i>
            <i
              id="changeSte"
              :class="nodeIcon(data.type) == 'iconTrue'?'icon iconfont icon-ir-d-'+data.type:'icon iconfont icon-ir-d-default'"
            ></i>
            <h4 :title="data.name">{{data.name}}</h4>
            <h5>ID:{{data.id}}</h5>
            <em id="pitchOnDes" class="fa fa-square-o" title="选中"></em>
            <em id="copeDes" class="icon iconfont icon-ir-copy" title="复制"></em>
            <em id="removeDes" class="fa fa-trash-o" title="删除"></em>
          </div>
        </drop>
      </div>
      <div class="aside">
        <rightaside></rightaside>
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
import rightaside from "./rightaside/index";
import getInstance from "@/utils/getInstance";
import {
  nodeClass,
  nodeIcon,
  specialNodeClass,
  origin,
  destination,
  addEndpointToNode
} from "@/utils/flowchart";
import { modules1 } from "@/service";

import dataflow from "@/components/flowchart/node/dataflow/index";
import workflow from "@/components/flowchart/node/workflow/index";
import streamflow from "@/components/flowchart/node/streamflow/index";
export default {
  components: {
    rightaside
  },
  data() {
    return {
      jsplumbInstance: null,
      flowType: "",
      flowData: {},
      nodeClass: nodeClass,
      nodeIcon: nodeIcon,
      links: [],
      addEndpointToNode: addEndpointToNode,
      self: this,
      dialogVisible: false,
      dialogComponent: "",
      nodeType: ""
    };
  },

  //
  created() {
    this.jsplumbInstance = getInstance("workplace");
    //this.jsplumbInstance.setContainer("workplace");
  },
  mounted() {
    this.initData();
  },
  updated() {
    // this.$nextTick(() => {
    //   this.customStep(item.id, item.type)
    // });
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
      this.nodeType = val;
      console.log(val);
    },
    initData() {
      this.reset();
      modules1.flowChart({ name: "ylb" }).then(res => {
        this.flowData = res.data.steps;
        this.flowType = res.data.flowType;
        this.links = res.data.links;
        //console.log("flowData.flowType", this.flowData.flowType);
        //console.log(this.flowData);
      });
    },
    reset() {
      this.flowData = [];
      this.jsplumbInstance.deleteEveryEndpoint("workplace");
    },
    handleDrop(data, event) {
      let node = {
        id: data.drawIcon.id + "_" + (this.flowData.length + 1),
        name: data.drawIcon.name,
        type: data.drawIcon.type,
        x: event.offsetX,
        y: event.offsetY,
        otherConfigurations: data.drawIcon.otherConfigurations,
        inputConfigurations: data.drawIcon.inputConfigurations,
        outputConfigurations: data.drawIcon.outputConfigurations
      };
      this.flowData.push(node);
    },
    setClass(type) {
      let result = "";
      if (type == "classD_A") {
        result = "t1Style";
      } else if (type == "classD_B") {
        result = "t3Style";
      } else {
        result = "t2Style";
      }

      return result;
    }
  }
};
</script>
<style lang="scss" scoped>
.flowchart {
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
      .workplace {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
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
