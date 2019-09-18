<template>
  <canvas class="jsplumbcanvas" id="canvas" width="1000" height="700">
    <!-- <div
      v-for="(data,index) in stepData"
      :id="data.id"
      :key="index"
      :class="'designIconBig stepsItem '+setClass(nodeClass(data.type))"
      :data-sign="data.name"
      :data-type="data.type"
      :style="'left:'+data.x+'px;top:'+data.y+'px;position:absolute;margin:0'"
      @dblclick="dblClick(data)"
    >
      <i class="icon iconfont icon-ir-designIconBg designIconBg"></i>
      <i
        id="changeSte"
        :class="nodeIcon(data.type) == 'iconTrue'?'icon iconfont icon-ir-d-'+data.type:'icon iconfont icon-ir-d-default'"
      ></i>
      <h4 :title="data.name">{{data.name}}</h4>
      <h5>ID:{{data.id}}</h5>
      <em
        id="copeDes"
        class="icon iconfont icon-ir-copy"
        title="复制"
        @click.prevent="copyNode(data)"
      ></em>
      <em id="removeDes" class="fa fa-trash-o" title="删除" @click="delNode(data.id)"></em>
    </div>-->
  </canvas>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions, mapState } from "vuex";
import getInstance from "@/utils/getInstance";
import _ from "lodash";
import {
  message,
  filterLinkData,
  nodeClass,
  nodeIcon,
  specialNodeClass,
  origin,
  destination,
  addEndpointToNode,
  getNodeType,
  setClass,
  connect
} from "@/utils/flowchart";
// import "@svgdotjs/svg.panzoom.js";
export default {
  watch: {
    data(val) {
      this.stepData = this.data.stepData;
      this.links = this.data.links;
    },
    stepData(val) {
      this.$emit("modifyChart", { stepData: val, links: this.links });
    },
    links(val) {
      this.$emit("modifyChart", { stepData: this.stepData, links: val });
    }
  },
  props: {
    data: {
      type: Object,
      default: false
    }
  },
  components: {},
  data: function() {
    return {
      jsplumbInstance: getInstance({
        container: "workplace",
        delConnections: this.delConnections,
        completedConnect: this.completedConnect,
        jsPlumb: this.data.jsPlumb
      }),
      stepData: [],
      links: [],
      nodeClass: nodeClass,
      nodeIcon: nodeIcon,
      setClass: setClass,
      ctx: ""
    };
  },
  computed: {
    //...mapState([""])
  },
  mounted() {
    this.initJsplumbChartCanvas("canvas");
    this.$nextTick(() => {
      this.appendItemToJsplumbCanvas(this.stepData);
    });
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {
    this.$nextTick(t => {
      this.drawJsplumbChart(
        {
          jsplumbInstance: this.jsplumbInstance,
          self: this,
          flowData: this.stepData,
          links: this.links
        },
        () => {
          this.getLinksData();
        }
      );
    });
  },
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    //...mapActions([""]),
    drawRect(val) {
      this.ctx.beginPath();
      this.ctx.rect(val.x, val.y, val.w, val.h);
      this.ctx.stroke();
    },
    initJsplumbChartCanvas(val) {
      // initialize our canvas
      let workplace = document.getElementById("workplace");
      let canvas = document.getElementById(val);
      canvas.width = workplace.offsetWidth;
      canvas.height = workplace.offsetHeight;
      this.ctx = canvas.getContext("2d");
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 2;

      // this.ctx.clearRect(0, 0, canvas.style.width, canvas.style.height);

      // console.log("workplace", workplace);
      // console.log(workplace.offsetWidth, workplace.offsetHeight);
    },
    appendItemToJsplumbCanvas(data) {
      _.forEach(data, (val, index) => {
        let data = {
          x: val.x,
          y: val.y,
          h: 70,
          w: 150
        };
        this.drawRect(data);
      });
    },
    resetJsplumbChart() {
      // document.getElementById("cavans").style = "matrix(1, 0, 0, 1, 0, 0)";
      //this.JsplumbChartCanvas("cavans");
    },

    drawJsplumbChart(data, connectCallback) {
      addEndpointToNode(
        data.jsplumbInstance,
        data.self,
        data.flowData,
        val => {
          this.stepData = _.map(this.stepData, item => {
            if (item.id == val.id) {
              return {
                ...item,
                x: val.x,
                y: val.y
              };
            } else {
              return item;
            }
          });
        },
        _
      );

      connect(
        data.jsplumbInstance,
        data.self,
        data.links,
        connectCallback
      );
    },
    completedConnect() {
      this.getLinksData();
    },
    // handleDrop(data, event) {
    //   this.$emit("handleDrop", { data: data, event: event });
    // },
    delConnections(val, fn) {
      message(
        "确定删除当前连线",
        () => {
          fn();
          this.getLinksData();
        },
        this
      );
    },
    delNode(val) {
      message(
        "确定删除当前节点",
        () => {
          this.stepData = _.filter(_.cloneDeep(this.stepData), item => {
            return item.id != val;
          });
        },
        this
      );
    },
    dblClick(val) {
      //this.$emit("nodedblClick", val);
    },
    getLinksData() {
      this.links = filterLinkData(
        _.map(this.jsplumbInstance.getAllConnections(), item => {
          return {
            name: item.id,
            source: item.sourceId,
            sourceOutput: item.endpoints[0].canvas.nextSibling.textContent,
            target: item.targetId,
            targetInput: item.target.dataset.type,
            input: item.endpoints[1].canvas.nextSibling.textContent
          };
        }),
        _
      );
      //console.log("  getLinksData() {", this.links);
    },
    reset() {
      this.stepData = [];
      this.links = [];
      this.jsplumbInstance.deleteEveryEndpoint("workplace");
    },
    addClass(ele, cls) {
      if (!this.hasClass(ele, cls)) {
        ele.className = ele.className == "" ? cls : ele.className + " " + cls;
      }
    },
    removeClass(elem, cls) {
      if (this.hasClass(elem, cls)) {
        var newClass = " " + elem.className.replace(/[\t\r\n]/g, "") + " ";
        while (newClass.indexOf(" " + cls + " ") >= 0) {
          newClass = newClass.replace(" " + cls + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, "");
      }
    },
    hasClass(elem, cls) {
      cls = cls || "";
      if (cls.replace(/\s/g, "").length == 0) return false; //当cls没有参数时，返回false
      return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
    },

    copyNode(val) {
      let node = {
        ...val,
        x: val.x + 50,
        y: val.y + 50,
        id: "rtc_" + val.type + "_" + (this.stepData.length + 1)
      };
      this.$emit("handleDrop", node);
    }
  }
};
</script>

<style lang="scss">
.jsplumbcanvas {
  // height: 100%;
  // width: 100%;
  position: relative;
  cursor: -webkit-grab;

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
    // cursor: move;
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
</style>
