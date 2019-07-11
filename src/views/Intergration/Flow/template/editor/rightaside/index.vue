<template>
  <div class="right-aside">
    <el-collapse accordion>
      <el-collapse-item v-for="(drawNav,index) in gqueryData"  :key="index">
        <template slot="title">
          <i class="icon iconfont icon-ir-supply-chain"></i>
          &nbsp;{{drawNav.group | cn}}
          <span
            class="iconNavNub"
          >({{drawNav.thisIcon.length}})</span>
        </template>
        <div
          class="designIcon"
          v-for="(drawIcon,key,index) in drawNav.thisIcon"
          :key="index"
          :data-index="index"
          :data-type="drawIcon.type"
        >
          <el-tooltip  effect="dark" :content="drawIcon.name|step" placement="top">
            <div>
              <!-- <i class="icon iconfont icon-ir-designIconBg designIconBg"></i> -->
              <i :class="drawIcon.name | iconFilter"></i>
              <h4>{{drawIcon.name | step}}</h4>
            </div>
          </el-tooltip>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { modules1 } from "@/service";
import { nodeIcon } from "@/utils/flowchart";
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
      gqueryData: []
    };
  },
  created() {
    modules1.stepData({}).then(res => {
      this.gqueryData = res.data;
    });
  },
  mounted() {
    // this.gqueryTree = this.filterGquery(this.flowType);
  },
  methods: {
    start() {
      console.log("拖动开始");
    },
    drag(ev, item) {
      //   console.log(ev);
      //   console.log(item);
      console.log("元素正在拖动");
    },
    filterGquery(flowType) {
      let tmp = [];
      // 创建一个不会有重复值的数组
      let allType = new Set();
      // 首先把传入的 flowType 过滤出来
      for (let item of this.gqueryData) {
        if (flowType === item.tags[1]) {
          tmp.push(item);
          allType.add(item.tags[0]);
        }
      }
      // 过滤出来之后， 在分类型
      let gqueryTreeData = {};
      for (let item of allType) {
        // 如果 item 的值 === tem.group 的值就插入到 item 中
        for (let value of tmp) {
          if (value.group === item) {
            // 如果 item 作为key 不存在设置默认值
            if (!gqueryTreeData[item]) {
              gqueryTreeData[item] = [];
            }
            gqueryTreeData[item].push(value);
          }
        }
      }
      return gqueryTreeData;
    }
  }
};
</script>
<style lang="scss" scoped>
.right-aside {
  background: #fff;
  height: 100%;
  padding: 0 0 0 10px;

  .designIcon{
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
