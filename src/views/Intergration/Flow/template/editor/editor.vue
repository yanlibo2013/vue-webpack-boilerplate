<template>
  <div class="editor">
    <div class="main">
      <drop class="workplace editor" @drop="handleDrop" id="workplace">
        <ul class="step-list">
          <li
            v-for="(item) in chartData.nodes"
            :id="item.id"
            :key="item.id"
            :addEndpoint="customStep(item.id, item.type)"
            class="step-item"
            :style="{
        left: item.x +'px',
        top: item.y +'px',
        color: returnColorByType(item.type),
        borderColor: returnColorByType(item.type)
      }"
          >
            <dl>
              <dt>
                <i :class="returnIconByType(item.type)"/>
              </dt>
              <dd>
                <p class="step-name">{{ item.name }}</p>
                <p class="step-id">ID: {{ item.name }}</p>
              </dd>
            </dl>
            <div class="operation">
              <span>
                <i class="el-icon-star-off"/>
                <i class="el-icon-delete"/>
              </span>
            </div>
          </li>
        </ul>
      </drop>
    </div>
    <div class="aside">
      <rightaside></rightaside>
    </div>
  </div>
</template>
<script>
import rightaside from "./rightaside/index";
import { jsPlumb } from "jsplumb";
import { type } from "os";
export default {
  components: {
    rightaside
  },
  data() {
    return {
      jsplumbInstance: null,
      //chartData: [],
      chartData: {
        nodes: [],
        connections: [],
        props: {}
      },
      querySourceMap: {},
      links: [],
      connectorPaintStyle: {
        // 基本连接线样式
        strokeWidth: 2,
        stroke: "#4e5568",
        joinstyle: "round",
        outlineColor: "white",
        outlineWidth: 0
      },
      connectorHoverStyle: {
        // 鼠标悬浮在连接线上的样式
        strokeWidth: 3,
        stroke: "#ff4e4e",
        outlineColor: "white",
        outlineWidth: 0
      },
      origin: {
        // 起点
        endpoint: ["Dot", { radius: 8 }], // 端点的形状
        connectorStyle: this.connectorPaintStyle, // 连接线的颜色，大小样式
        connectorHoverStyle: this.connectorHoverStyle,
        paintStyle: {
          stroke: "#4e5568",
          fill: "transparent",
          radius: 6,
          lineWidth: 6
        }, // 端点的颜色样式
        // anchor: "AutoDefault",
        isSource: true, // 是否可以拖动（作为连线起点）
        connector: [
          "Flowchart",
          { stub: [5, 5], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
        ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
        isTarget: false, // 是否可以放置（连线终点）
        maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
        connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
      },
      destination: {
        // 终点
        endpoint: ["Dot", { radius: 6 }], // 端点的形状
        connectorStyle: this.connectorPaintStyle, // 连接线的颜色，大小样式
        connectorHoverStyle: this.connectorHoverStyle,
        paintStyle: { fill: "#4e5568" }, // 端点的颜色样式
        isSource: false, // 是否可以拖动（作为连线起点）
        connector: [
          "Straight",
          { stub: [5, 5], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
        ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
        isTarget: true, // 是否可以放置（连线终点）
        maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
        connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
      },
      archor: {},
      step: [
        // 只有左边一个点
        {
          type: ["sink"],
          stepInformation: [
            { position: "Left", style: "destination", type: "input" }
          ],
          maxConnections: 1
        },
        // 右边一个点
        {
          type: ["sqlsource", "source"],
          stepInformation: [
            { position: "Right", style: "origin", type: "output" }
          ],
          maxConnections: 100
        },
        // 左边一个点， 右边两个点
        {
          type: ["decision", "validate", "split"],
          stepInformation: [
            { position: "Left", style: "destination", type: "input" },
            {
              position: [1, 0.3, 0, 0],
              style: "origin",
              label: this.getRightLable,
              type: "output"
            },
            {
              position: [1, 0.7, 0, 0],
              style: "origin",
              label: this.getRightLable,
              type: "output"
            }
          ],
          maxConnections: 1
        },
        // 左边两个点， 右边一个点
        {
          type: ["minus", "join", "lookup", "productjoin"],
          stepInformation: [
            { position: "Right", style: "origin", type: "output" },
            {
              position: [0, 0.3, 0, 0],
              style: "destination",
              label: this.getLeftLable,
              type: "input"
            },
            {
              position: [0, 0.7, 0, 0],
              style: "destination",
              label: this.getLeftLable,
              type: "input"
            }
          ],
          maxConnections: 1
        },
        // 左右两个点
        {
          type: [
            "supplement",
            "sample",
            "filter",
            "sql",
            "transform",
            "aggregate",
            "top",
            "lookupTable",
            "intersect",
            "union",
            "lookup",
            "starjoin"
          ],
          stepInformation: [
            { position: "Left", style: "destination", type: "input" },
            { position: "Right", style: "origin", type: "output" }
          ],
          maxConnections: 1
        }
      ]
    };
  },

  //
  created() {
    // console.log("子组件 created");
    // console.log("子组件 nextTick");
  },
  mounted() {
    //console.log("子组件 mounted");
    this.initJsplump(() => {
      this.initFlow({
        nodes: [
          { id: "source_1", name: "source_1", type: "source", x: 249, y: 162 },
          {
            id: "7bf74499-2fee-4792-bfa0-ed047551e096",
            name: "spark_join",
            type: "join",
            x: 747,
            y: 177
          },
          {
            id: "3e97cbdc-7b0e-4661-82e4-f3d9540c6b83",
            name: "spark_source",
            type: "source",
            x: 113,
            y: 294
          }
        ],
        connections: [
          //uuid: value.type + "_" + sign,
          {
            sourceId: "output_source_1", //类型 节点ID
            targetId: "input_left_7bf74499-2fee-4792-bfa0-ed047551e096" //类型 锚点类型 ID
          },
          {
            sourceId: "output_3e97cbdc-7b0e-4661-82e4-f3d9540c6b83",
            targetId: "input_right_7bf74499-2fee-4792-bfa0-ed047551e096"
          }
        ],
        props: {}
      });
    });
  },
  updated() {
    // this.$nextTick(() => {
    //   this.customStep(item.id, item.type)
    // });
  },
  methods: {
    clearAllpanel() {
      this.chartData = {
        nodes: [],
        connections: [],
        props: {}
      };
      this.jsplumbInstance.deleteEveryEndpoint("workplace");
    },
    handleDrop(data, event) {
      let id = jsPlumbUtil.uuid();
      let currentItem = {
        id,
        name: data.item.id,
        type: data.item.name,
        x: event.screenX - 250,
        y: event.screenY - 200
      };

      // console.log("添加节点");
      // console.log(data);
      // console.log(event);
      // this.customStep(currentItem);
      // console.log("当前锚点",this.archor);
      console.log(this.getCurrentObj(currentItem.type, this.step));
      //return;

      this.chartData.nodes.push(currentItem);
      this.archor = {};

      this.$nextTick(() => {
        //console.log(this.steps);
        // console.log(this.$refs.flowpanel.nodes);
        this.initNode(currentItem);

        console.log("拖动完成", this.chartData.nodes);
      });
    },

    // jsplumb初始化
    initJsplump(fn) {
      jsPlumb.ready(() => {
        this.jsplumbInstance = jsPlumb.getInstance();
        this.jsplumbInstance.setContainer("workplace");
        this.bindEvent();
        fn();
      });
    },
    // 初始化node节点
    initNode(item) {
      // initialise draggable elements.
      // 给每个元素添加拖拽事件
      let _self = this;
      this.jsplumbInstance.draggable(item.id, {
        filter: ".resize",
        containment: true, //true  限制节点拖动区域
        start(params) {
          // 拖动开始
          // console.log(params);
          //console.log("拖动开始");
        },
        drag(params) {
          // 拖动中
          //console.log("拖动中");
          // console.log(params);
        },
        stop(params) {
          // 拖动结束
          /// console.log("拖动介绍");
          // console.log(params);
          // let id = params.el.id;
          // _self.$nextTick(() => {
          //   let top = params.el.style.top;
          //   let left = params.el.style.left;
          //   _self.chartData.nodes.forEach(item => {
          //     if (item.id === id) {
          //       item.nodeStyle.left = left;
          //       item.nodeStyle.top = top;
          //     }
          //   });
          // });
        }
      });
    },
    /**
     * @description 流程渲染
     * @param {data} 流程数据
     */
    draw(data) {
      data.nodes.forEach(item => {
        this.initNode(item);
      });
      data.connections.forEach(item => {
        this.$nextTick(() => {
          jsPlumb.batch(() => {
            this.jsplumbInstance.connect({
              uuids: [item.sourceId, item.targetId],
              editable: true
            });
          }, true);
        });
      });
    },

    initFlow(data) {
      this.chartData = data;

      this.$nextTick(() => {
        this.draw(data);
      });
    },

    //jsplumb 事件监听
    bindEvent() {
      let _self = this;

      // 监听 connection 事件
      this.jsplumbInstance.bind("connection", function(info, event) {
        // info.connection.getOverlay("label").setLabel(info.connection.id);
        // console.log("监听 connection 事件",info);
        // console.log(event);
      });

      // 连接线删除时触发
      this.jsplumbInstance.bind("connectionDetached", function(connection) {
        //console.log("连接线删除时触发");
        // console.log(connection)
        // _self.chartData.connections.forEach((conn, idx) => {
        //   if (connection.sourceId === conn.sourceId && connection.targetId === conn.targetId) {
        //     _self.chartData.connections.splice(idx, 1)
        //   }
        // });
      });

      // 监听拖动connection 事件，判断是否有重复链接
      this.jsplumbInstance.bind("beforeDrop", function(info, event) {
        console.log("监听拖动connection 事件，判断是否有重复链接");
        // info.connection.getOverlay("label").setLabel(info.connection.id);
        console.log(info);
        // console.log(event);
        // console.log("节点之间连线变化", _self.chartData.connections);
        _self.chartData.connections.push({
          sourceId: info.sourceId,
          targetId: info.targetId
        });

        console.log(_self.chartData);
        console.log(JSON.stringify(_self.chartData));

        // 判断是否已有该连接
        // let isSame = true;
        // _self.chartData.connections.forEach(item => {
        //   if (
        //     (item.targetId === info.targetId &&
        //       item.sourceId === info.sourceId) ||
        //     (item.targetId === info.sourceId && item.sourceId === info.targetId)
        //   ) {
        //     isSame = false;
        //   }
        // });
        // if (isSame) {
        //   _self.chartData.connections.push({
        //     targetId: info.targetId,
        //     sourceId: info.sourceId
        //   });
        // } else {
        //   _self.$message.error("不允许重复连接！");
        // }

        // console.log(_self.chartData);
        //return isSame;

        return true;
      });
    },
    // 根据类型返回 ICON
    returnIconByType(type) {
      if (type === "sink") {
        return "el-icon-printer";
      } else if (type === "sqlsource" || type === "source") {
        return "el-icon-share";
      } else {
        return "el-icon-news";
      }
    },
    // 根据类型返回 color
    returnColorByType(type) {
      if (type === "sink") {
        return "#8367df";
      } else if (type === "sqlsource" || type === "source") {
        return "#48c038";
      } else {
        return "#4586f3";
      }
    },

    // 根据字段是否在数组 返回当前对象
    // 比如 type 是否在 array 数组中 type 中
    // array = [
    //   {
    //     type: ['type1', 'type2']
    //   }
    // ]
    getCurrentObj(type, step) {
      for (let value of step) {
        if (value.type.includes(type)) {
          return value;
        }
      }
    },
    getRightLable(type) {
      // 按文字分类
      // 右边两个点 yes no
      let step = [
        // 右边两个点 yes no
        {
          type: ["decision", "split"],
          text: ["yes", "no"],
          location: [[-2, 0], [-2, 1.2]]
        },
        // 右边两个点 ok  error
        {
          type: ["validate"],
          text: ["ok", "error"],
          location: [[2, -0.5], [2.5, 1.2]]
        }
      ];
      let current = this.getCurrentObj(type, step);
      if (!current) {
        return false;
      }
      return [
        [
          "Label",
          {
            label: current.text[0],
            id: "label-1",
            cssClass: "aLabel",
            location: current.location[0]
          }
        ],
        [
          "Label",
          {
            label: current.text[1],
            id: "label-2",
            cssClass: "aLabel",
            location: current.location[1]
          }
        ]
      ];
    },
    getLeftLable(type) {
      // 按文字分类
      let step = [
        // 左边连个点 left right
        {
          type: ["join", "productjion"],
          text: ["left", "right"],
          location: [[-2, 0], [-2, 1.2]]
        },
        // 左边连个点 input1 input2
        {
          type: ["minus"],
          text: ["input1", "input2"],
          location: [[2, -0.5], [2.5, 1.2]]
        }
      ];
      let current = this.getCurrentObj(type, step);
      if (!current) {
        return false;
      }
      return [
        [
          "Label",
          {
            label: current.text[0],
            id: "label-1",
            cssClass: "aLabel",
            location: current.location[0]
          }
        ],
        [
          "Label",
          {
            label: current.text[1],
            id: "label-2",
            cssClass: "aLabel",
            location: current.location[1]
          }
        ]
      ];
    },
    customStep(element, type) {
      let current = this.getCurrentObj(type, this.step);
      if (!current) {
        console.error(`${type} 类型不存在`);
        return;
      }
      this.addEndpoint(element, current, type);
    },
    addEndpoint(element, current, type) {
      let index = 0;
      for (let value of current.stepInformation) {
        let labels = value.label ? value.label(type)[index++] : "";
        let sign = labels ? labels[1]["label"] + "_" + element : element;
        this.$nextTick(() => {
          this.jsplumbInstance.addEndpoint(
            element,
            {
              anchors: value.position,
              maxConnections: current.maxConnections,
              connectionType: {
                sourceType: value.type + "_" + sign,
                targetType: value.type + "_" + sign
              },
              uuid: value.type + "_" + sign,
              overlays: labels ? [labels] : ""
            },
            this[value["style"]]
          );
        });
        // this.archor={
        //     type:value.type,
        //     labels:labels
        //   }

        // console.log("=============",{
        //   type:value.type,
        //   labels:labels
        // });

        // console.log("current",current);
      }
    },

    // 数组对象去重
    duplicateRemoval(arr, _key) {
      let map = new Map();
      arr.forEach((item, index) => {
        if (!map.has(item[_key])) {
          map.set(item[_key], item);
        }
      });
      return [...map.values()];
    },
    // 查找前查找是谁链接的自己 和判断是否已经连线
    querySourceData(id, type) {
      // source  sqlsource 特殊处理 没有连线也可以双击
      if (type === "source" || type === "sqlsource") {
        console.log("处理");
        return true;
      }
      let querySource = this.querySourceMap[id];
      // 没有连线
      if (!querySource) {
        console.log("没有数据");
        return false;
      }
      let isLine = "";
      // 如果能走到这 判断 是一根线 还是两根线  根据 getLabel 来判断 this.querySourceMap[id] 里边是一个值 还是两个值
      // 获取label
      let getLable = this.getLeftLable(type);
      if (getLable) {
        isLine = querySource.length === 2;
        if (!isLine) {
          console.log("没有连线");
          return false;
        }
        for (let index in querySource) {
          let text = getLable[index][1]["label"] + "_";
          console.log(querySource[index]);
          console.log(querySource[index]["input_" + text + id]);
        }
      } else {
        console.log(querySource);
        isLine = querySource.length === 1;
        if (!isLine) {
          console.log("没有连线");
          return false;
        }
        console.log(querySource[0]["input_" + id]);
      }
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
      .step-list {
        line-height: 1;
        height: 100%;
        //position: relative;
        li {
          cursor: pointer;
          border-width: 2px;
          border-style: solid;
          box-shadow: 0 10px 18px -9px rgba(0, 0, 0, 0.5);
          background: #ffffff;
          height: 70px;
          width: 150px;
          position: absolute;
          dl {
            display: flex;
            padding: 4px;
            dt {
              margin-right: 5px;
              i {
                font-size: 30px;
              }
            }
            .step-name {
              font-size: 14px;
              font-weight: 900;
              width: 100px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .step-id {
              margin-top: 3px;
              font-size: 10px;
            }
          }
          .operation {
            padding-right: 10px;
            span {
              float: right;
            }
          }
        }
      }
    }
  }
  .aside {
    width: 250px;
  }
}
</style>
