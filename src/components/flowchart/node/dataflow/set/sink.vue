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

          <div v-if="index==0">
            <div class="nodeTable">
              <div class="block__list block__list_words blockLeft">
                <div class="block__list-title">
                  备选字段
                  <el-input class="fieldsInput" placeholder="请输入字段名称" prefix-icon="el-icon-search"></el-input>
                  <i title="新增已选字段" class="ns_fields1 el-icon-plus"></i>
                  <i title="导入表格内字段" class="ns_fields3 icon iconfont icon-ir-copy"></i>
                </div>
                <ol>
                  <template>
                    <el-table ref="multipleTable" :data="[]" style="width: 100%;">
                      <el-table-column fixed type="index" width="60"></el-table-column>
                      <el-table-column prop="column" label="字段名"></el-table-column>
                      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                    </el-table>
                  </template>
                </ol>
                <el-pagination
                  small
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="inputLeftPagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="10"
                ></el-pagination>
              </div>
              <div class="block__list block__list_words blockRight">
                <div class="block__list-title">
                  <span>已选字段</span>
                  <el-input class="fieldsInput" placeholder="请输入字段名称" prefix-icon="el-icon-search"></el-input>
                  <span class="removeAllFields" title="删除全部已选字段">
                    <i class="fa fa-trash-o"></i>
                  </span>
                  <span class="removeAllFields pr20" title="删除已选的非法字段">
                    <i class="fa fa-strikethrough"></i>
                  </span>
                  <a class="getSchema" title="提取schema">
                    <i class="fa fa-external-link"></i>
                  </a>
                </div>
                <ol>
                  <template>
                    <el-table ref="multipleTable" :data="[]" style="width: 100%;">
                      <el-table-column fixed type="index" width="60"></el-table-column>
                      <el-table-column prop="alias" label="别名">
                        <template slot-scope="scope">
                          <el-input
                            placeholder="别名"
                          ></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" width="60">
                        <template slot-scope="scope">
                          <el-col :span="3" class="removeFields">
                            <i
                              class="el-icon-close"
                            ></i>
                          </el-col>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </ol>
                <el-pagination
                  small
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="inputLeftPagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="10"
                ></el-pagination>
              </div>
              <div style="clear: both"></div>
              <br />
              <el-row>
                <el-col :span="24">提示：别名允许的字符包括字母,数字和下划线.</el-col>
              </el-row>
            </div>
          </div>
          <el-form
            label-width="150px"
            :label-position="labelPosition"
            :model="numberValidateForm"
            ref="numberValidateForm"
            v-else
          >
            <el-form-item
              prop="description"
              :label="'description'"
              :rules="[
              { required: true, message: 'description 不能为空'},
              { type: 'number', message: 'description 必须为数字值'}
            ]"
            >
              <el-tooltip class="item" effect="dark" content="描述信息" placement="top">
                <i class="parIcon el-icon-warning"></i>
              </el-tooltip>
              <el-input
                name="description"
                placeholder="description"
                type="description"
                v-model.number="numberValidateForm.description"
              ></el-input>
            </el-form-item>
          </el-form>
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
      inputLeftPagesize: 10,
      numberValidateForm: {
        description: ""
      },
      nodeSetTab: [
        { title: "参数", name: "parameter", icon: "fa fa-gear" },
        { title: "输出", name: "output", icon: "fa fa-sign-out" }
      ],
      disable: [false, false, false, false, false, false],
      activeName2: "",
      labelPosition: "left",
      ruleForm: {
        //定义表单验证字段
        newName: "", //节点名称
        description: ""
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
        ],
        description: [
          { required: true, message: "节点名称不能为空", trigger: "blur" }
        ]
      },
      inputFiled: [
        {
          id: "input",
          fields: [
            { column: "NAME", alias: "" },
            { column: "JOB", alias: "" },
            { column: "count", alias: "" },
            { column: "avg", alias: "" },
            { column: "countD", alias: "" },
            { column: "sum", alias: "" },
            { column: "sumD", alias: "" },
            { column: "max", alias: "" },
            { column: "min", alias: "" },
            { column: "acd", alias: "" }
          ]
        }
      ]
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

  .nodeTable {
    float: left;
    width: 100%;
    max-height: 100%;
  }

  .block__list {
    box-sizing: border-box;
    border: 1px solid #bce8f1;
  }

  .block__list ul {
    margin: 0px;
    padding: 0px;
  }

  .block__list-title {
    padding: 5px 10px 5px 10px;
    text-align: left;
    color: #31708f;
    background: #dae6ec;
  }

  .block__list_words li {
    padding: 10px;
  }

  .block__list_words .sortable-ghost {
    opacity: 0.4;
    background-color: #f4e2c9;
  }

  .block__list_tags:after {
    clear: both;
    content: "";
    display: block;
  }

  .block__list_tags li {
    color: #fff;
    float: left;
    margin: 8px 20px 10px 0;
    padding: 5px 10px;
    min-width: 10px;
    background-color: #5f9edf;
    text-align: center;
  }

  .block__list_tags li:first-child:first-letter {
    text-transform: uppercase;
  }
  .blockLeft {
    width: 39%;
    float: left;
  }

  .blockRight {
    position: relative;
    width: 60%;
    float: left;
    margin-left: 1%;
  }

  .blockLeft li {
    cursor: pointer;
  }

  .fieldsInput {
    width: 50%;
  }

  .ns_fields1,
  .ns_fields2 {
    float: right;
    font-size: 16px;
    height: 18px;
    line-height: 18px;
    margin: 7px 5px 0px 0px;
    font-weight: bold;
    cursor: pointer;
  }

  .ns_fields2 {
    margin-right: 10px;
  }

  .ns_fields3 {
    margin-left: 10px;
    font-size: 16px;
    line-height: 10px;
    cursor: pointer;
  }

  .ns_fields1:hover,
  .ns_fields2:hover,
  .ns_fields3:hover {
    color: #ff4e4e;
  }

  .removeFields {
    text-align: center;
  }

  .removeFields i {
    cursor: pointer;
    color: #ff4949;
    font-weight: bold;
  }

  .liFieldsClass {
    float: left;
    width: 95%;
  }

  .selectClass {
    margin-top: -10px;
    width: 100%;
  }

  .removeAllFields {
    float: right;
    margin: 8px 10px 0px 0px;
  }

  .removeAllFields:hover {
    color: #ff4949;
    cursor: pointer;
  }

  .getSchema {
    float: right;
    margin: 9px 20px 0px 0px;
  }

  .getSchema:hover {
    color: #ff4949;
    cursor: pointer;
  }

  .expiredTimeSelect {
    width: 100px;
  }

  .ns_fields1,
  .ns_fields2 {
    float: right;
    font-size: 16px;
    height: 18px;
    line-height: 18px;
    margin: 7px 5px 0px 0px;
    font-weight: bold;
    cursor: pointer;
  }

  .ns_fields2 {
    margin-right: 10px;
  }

  .ns_fields3 {
    margin-left: 10px;
    font-size: 16px;
    line-height: 10px;
    cursor: pointer;
  }

  .ns_fields1:hover,
  .ns_fields2:hover,
  .ns_fields3:hover {
    color: #ff4e4e;
  }

  .peForm {
    padding: 10px;
    overflow-y: auto;
    margin: 0px 0px 25px 0px;
    max-height: calc(55vh - 95px);
  }

  .word-wrap {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
  }

  .priorityMes {
    position: absolute;
    top: 13px;
    color: #333;
    left: -20px;
  }

  .elForm {
    margin: 0px 0px 10px 0px;
  }

  .red {
    color: red;
  }

  .pr20 {
    padding-right: 10px;
  }

  .pl40 {
    padding-left: 40px;
  }

  ol {
    width: 100%;
  }

  .pl60 {
    padding-left: 60px;
  }

  .maxHeight {
    max-height: 35px;
    overflow-y: auto;
  }

  .el-notification__content {
    width: 200px;
  }

  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
