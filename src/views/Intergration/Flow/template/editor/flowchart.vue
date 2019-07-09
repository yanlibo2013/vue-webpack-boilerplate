<template>
  <div class="editor">
    <div class="editor-bar">
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
            :data-index="addEndpoint(data.type,data.id)"
            :data-type="data.type"
            :style="'left:'+data.x+'px;top:'+data.y+'px;position:absolute;margin:0'"
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
  destination
} from "@/utils/flowchart";
import { modules1 } from "@/service";

import { type } from "os";
export default {
  components: {
    rightaside
  },
  data() {
    return {
      jsplumbInstance: null,
      flowData: {},
      nodeClass: nodeClass,
      nodeIcon: nodeIcon,
      links: []
    };
  },

  //
  created() {
    this.jsplumbInstance = getInstance("workplace");
     this.jsplumbInstance.setContainer("workplace");
  },
  mounted() {
    modules1.flowChart({ name: "ylb" }).then(res => {
      this.flowData = res.data.steps;
      this.links = res.data.links;
    });
  },
  updated() {
    // this.$nextTick(() => {
    //   this.customStep(item.id, item.type)
    // });
  },
  methods: {
    reset() {
      this.chartData = {
        nodes: [],
        connections: [],
        props: {}
      };
    },
    handleDrop(data, event) {},
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
    },
    addEndpoint(drawType, dataIndex) {
      this.$nextTick(() => {
        //节点锚点添加
        //左侧无，右侧一个起点
        if (nodeClass(drawType) == "classD_A") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "RightMiddle", maxConnections: 100 },
            { uuid: dataIndex + "output" + "origin", ...origin }
          );
        } else if (nodeClass(drawType) == "classD_B") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "LeftMiddle" },
            { uuid: dataIndex + "input" + "destination", ...destination }
          );
        } else if (
          nodeClass(drawType) == "classD_C" ||
          nodeClass(type) == "classW_C"
        ) {
          //左侧一个终点（多），右侧起点(多)
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "LeftMiddle", maxConnections: -1 },
            { uuid: dataIndex + "input" + "destination", ...destination }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "RightMiddle", maxConnections: -1 },
            { uuid: dataIndex + "output" + "origin", ...origin }
          );
        } else if (specialNodeClass(drawType) == "classD_D1") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [1, 0.3, 0, 0],
              maxConnections: -1,
              overlays: [
                [
                  "Label",
                  {
                    location: [1.5, -0.5],
                    label: "yes",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "yes" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [1, 0.7, 0, 0],
              maxConnections: -1,
              overlays: [
                [
                  "Label",
                  {
                    location: [1.5, 1.3],
                    label: "no",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "no" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "LeftMiddle" },
            { uuid: dataIndex + "input" + "destination" },
            ...destination
          );
        } else if (specialNodeClass(drawType) == "classD_D2") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [1, 0.3, 0, 0],
              maxConnections: -1,
              overlays: [
                [
                  "Label",
                  {
                    location: [1.5, -0.5],
                    label: "ok",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "ok" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [1, 0.7, 0, 0],
              maxConnections: -1,
              overlays: [
                [
                  "Label",
                  {
                    location: [1.5, 1.3],
                    label: "error",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "error" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "LeftMiddle" },
            { uuid: dataIndex + "input" + "destination", ...destination }
          );
        } else if (specialNodeClass(drawType) == "classD_E1") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "RightMiddle", maxConnections: -1 },
            { uuid: dataIndex + "output" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [0, 0.3, 0, 0],
              overlays: [
                [
                  "Label",
                  {
                    location: [-1, -0.5],
                    label: "left",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "left" + "destination", ...destination }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [0, 0.7, 0, 0],
              overlays: [
                [
                  "Label",
                  {
                    location: [-1, 1.5],
                    label: "right",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "right" + "destination", ...destination }
          );
        } else if (specialNodeClass(drawType) == "classD_E2") {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "RightMiddle", maxConnections: -1 },
            { uuid: dataIndex + "output" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [0, 0.3, 0, 0],
              overlays: [
                [
                  "Label",
                  {
                    location: [-1, -0.5],
                    label: "input1",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "input1" + "destination", ...destination }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            {
              anchors: [0, 0.7, 0, 0],
              overlays: [
                [
                  "Label",
                  {
                    location: [-1, 1.5],
                    label: "input2",
                    cssClass: "endpointSourceLabel"
                  }
                ]
              ]
            },
            { uuid: dataIndex + "input2" + "destination" },
            ...destination
          );
        } else {
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "RightMiddle", maxConnections: -1 },
            { uuid: dataIndex + "output" + "origin", ...origin }
          );
          this.jsplumbInstance.addEndpoint(
            dataIndex,
            { anchors: "LeftMiddle" },
            { uuid: dataIndex + "input" + "destination", ...destination }
          );
        }
        this.jsplumbInstance.draggable(dataIndex); //节点拖动
        //节点之间连线
        this.links.forEach((item, index) => {
          this.jsplumbInstance.connect({
            uuids: [
              item.source + item.sourceOutput + "origin",
              item.target + item.input + "destination"
            ]
          });
        });
        return dataIndex;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.editor {
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

        .designIcon:hover {
          color: #3895ff;
        }

        .designIcon i {
          float: none !important;
          position: absolute;
          left: 0px;
          margin: 0px;
          width: 50px !important;
          height: 50px !important;
          line-height: 50px !important;
          font-size: 40px !important;
        }

        .designIcon h4 {
          position: absolute;
          top: 45px;
          margin: 0px;
          padding: 0px;
          font-size: 12px;
          width: 100%;
          font-weight: normal;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .t1Style {
          border: 2px solid #48c038;
          color: #48c038;
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
