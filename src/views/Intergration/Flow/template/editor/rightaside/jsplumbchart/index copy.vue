<template>
  <div class="right-aside">
    <el-collapse accordion>
      <el-collapse-item v-for="(drawNav,index) in gqueryData" :key="index">
        <template slot="title">
          <i class="icon iconfont icon-ir-supply-chain"></i>
          &nbsp;{{drawNav.group | cn}}
          <span
            class="iconNavNub"
          >({{drawNav.thisIcon.length}})</span>
        </template>
        <drag
          class="drag designIcon"
          :transfer-data="{ drawIcon }"
          v-for="(drawIcon,key,index) in drawNav.thisIcon"
          :key="index"
          :data-index="index"
          :data-type="drawIcon.type"
        >
          <el-tooltip effect="dark" :content="drawIcon.name|step" placement="top">
            <div>
              <!-- <i class="icon iconfont icon-ir-designIconBg designIconBg"></i> -->
              <i :class="drawIcon.name | iconFilter"></i>
              <h4>{{drawIcon.name | step}}</h4>
            </div>
          </el-tooltip>
        </drag>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import _ from "lodash";
import { modules1 } from "@/service";
import { nodeIcon } from "@/utils/flowchart";
import { stepData } from "mock/data/jsplumbchart/stepData.js";
export default {
  filters: {
    step: function(value) {
      let obj = {};
      for (var i in obj) {
        if (value == i) {
          return obj[i];
        }
      }
      return value;
    },
    cn: function(value) {
      let obj = {};
      for (var i in obj) {
        if (value == i) {
          return obj[i];
        }
      }
      return value;
    },
    iconFilter: function(value) {
      if (nodeIcon(value) == "iconTrue") {
        return "icon iconfont icon-ir-d-" + value;
      } else {
        return "icon iconfont icon-ir-d-default";
      }
    }
  },
  props: {
    flowType: {
      type: String,
      default: "dataflow"
    },
    range: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gqueryTree: [],
      gqueryData: [],
      stepList:[]
    };
  },
  created() {},
  mounted() {
    this.initData(stepData);
  },
  methods: {
    drag(ev, item) {
      //   console.log(ev);
      //   console.log(item);
      //console.log("元素正在拖动");
    },
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
    initData(val) {
      this.stepList = this.getLeftAsideData(
        val,
        _.uniq(this.getGroupData(val))
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.right-aside {
  background: #fff;
  height: 100%;
  padding: 0 0 0 10px;

  .designIcon {
    text-align: center;
    display: inline-block;
  }

  .designIcon:hover {
    color: #3895ff;
  }

  .designIcon i {
    float: none !important;
    // position: absolute;
    left: 0px;
    margin: 0px;
    width: 50px !important;
    height: 50px !important;
    line-height: 50px !important;
    font-size: 40px !important;
  }

  .designIcon h4 {
    // position: absolute;
    // top: 45px;
    margin: 0px;
    padding: 0px;
    font-size: 12px;
    // width: 100%;
    font-weight: normal;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
