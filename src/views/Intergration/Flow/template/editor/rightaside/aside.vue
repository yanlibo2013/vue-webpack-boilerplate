<template>
  <div class="right-aside">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(val, key, index) in gqueryTree"
        v-show="key !== 'Datamining'"
        :key="index"
        :title="key"
        :name="index"
      >
        <ul class="gquery-item">
          <!-- <li
            v-for="item in val"
            :key="item.id"
            draggable="true"
            @dragstart="start"
            @drag="(ev) => drag(ev, item)"
          >
            <i class="el-icon-message"/>
            <p>{{ item.name }}</p>
          </li>-->
          <drag class="drag" :transfer-data="{ item }" v-for="item in val" :key="item.id">
            <li>
              <i class="el-icon-message"/>
              <p>{{ item.name }}</p>
            </li>
          </drag>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
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
      gqueryData: [
        {
          id: "spark_RandomForestTrainStep",
          name: "RandomForestTrainStep",
          type: "RandomForestTrainStep",
          group: "Datamining",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            numTrees: "1",
            maxDepth: "1",
            featureSubsetStrategy: "auto",
            impurity: "gini",
            featureColumns: [],
            categoricalFeaturesInfo: [
              {
                featureColumn: "",
                categories: ""
              }
            ],
            maxBins: "1",
            labelColumn: "",
            modelPath: "0.7",
            modelType: "classification",
            numClasses: "2"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Datamining", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "exclusive",
          name: "exclusive",
          type: "exclusive",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            conditions: [
              {
                output: "",
                condition: ""
              }
            ]
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "parallel",
          name: "parallel",
          type: "parallel",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            conditions: [
              {
                output: "",
                condition: ""
              }
            ]
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "shell",
          name: "shell",
          type: "shell",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            logFile: "/tmp/output.log",
            workingDiretory: "/tmp",
            dataflowId$: "shell",
            command: "/bin/sh -c 'echo 'good' > /tmp/good'",
            logPattern: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "spark",
          name: "spark",
          type: "spark",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sparkHome: "/usr/hdp/current/spark-client",
            deploymode: "client",
            applicationClass: "org.apache.spark.examples.SparkPi",
            applicationArgs: "1000",
            master: "yarn"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "hive",
          name: "hive",
          type: "hive",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            database: "default",
            logFile: "/tmp/hive-output.log",
            workingDiretory: "/tmp",
            dataflowId$: "hive",
            hive_cmd: "/usr/bin/hive",
            sql: "select 1"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "hawq",
          name: "hawq",
          type: "hawq",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            hawq_cmd: "/usr/local/hawq/bin/psql",
            database: "gpadmin",
            port: "5432",
            logFile: "/tmp/hawq-output.log",
            host: "node1",
            workingDiretory: "/tmp",
            dataflowId$: "hawq",
            user: "gpadmin",
            sql: "select 1"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "mapreduce",
          name: "mapreduce",
          type: "mapreduce",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            jarFile: "/tmp/hadoop-mapreduce-examples-2.2.0.jar",
            logFile: "/tmp/hive-output.log",
            workingDiretory: "/tmp",
            dataflowId$: "mapreduce",
            arguments: "/usr/joe/wordcount/input /usr/joe/wordcount/output",
            program: "wordcount",
            hadoop_cmd: "/usr/bin/hadoop"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "dataflow",
          name: "dataflow",
          type: "dataflow",
          group: "Process",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            dataflowId$: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Process", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "event",
          name: "event",
          type: "event",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            cron: "",
            filterClass: "",
            parameter: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "workflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_analyzeDataset",
          name: "analyzeStats",
          type: "analyzeDataset",
          group: "IO",
          icon: "default.png",
          inputCount: 0,
          outputCount: 2,
          inputConfigurations: [],
          outputConfigurations: [
            {
              id: "string?options=columnStat,histogramStat",
              fields: "fields"
            }
          ],
          otherConfigurations: {
            schema: "schema",
            sessionCache: "",
            interceptor: "",
            dataset: "dataset",
            relativeSD: "double?default=0.05",
            sampleRate: "double?default=1"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["IO", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_sqlsource",
          name: "sqlsource",
          type: "sqlsource",
          group: "IO",
          icon: "default.png",
          inputCount: 0,
          outputCount: 1,
          inputConfigurations: [],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            sql: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["IO", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_decision",
          name: "decision",
          type: "decision",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            condition: "",
            sessionCache: "",
            interceptor: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_validate",
          name: "validate",
          type: "validate",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            detailColumn: "errorInfo",
            validationRules: [
              {
                name: "",
                expression: ""
              }
            ],
            action: "",
            sessionCache: "",
            interceptor: "",
            showDetails: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_sql",
          name: "sql",
          type: "sql",
          group: "Transform",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            sql: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Transform", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "sample",
          name: "sample",
          type: "sample",
          group: "Transform",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            withReplacement: "false",
            interceptor: "string",
            fraction: "0.2"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Transform", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_transform",
          name: "transform",
          type: "transform",
          group: "Transform",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            expressions: []
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Transform", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_cache",
          name: "lookupTable",
          type: "cache",
          group: "mapping",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            schema: "",
            singleRowCache: "true",
            sessionCache: "",
            interceptor: "",
            url: "",
            path: "",
            password: "",
            keyColumn: "",
            cacheName: "",
            engine: "MapDB",
            valueColumns: [],
            dataset: "",
            key: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["mapping", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_lookup",
          name: "lookup",
          type: "lookup",
          group: "Join",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            mode: "",
            ruleSettings: [
              {
                tabName: "Set_1",
                dataset: "",
                datasetId: "",
                schema: "",
                schemaId: "",
                inputKeyColumn: "",
                valueColumns: [
                  {
                    name: "",
                    alias: "",
                    defaultNoMatch: "",
                    defaultNullKey: ""
                  }
                ],
                interceptor: "",
                sessionCache: ""
              }
            ]
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Join", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_aggregate",
          name: "aggregate",
          type: "aggregate",
          group: "Group",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            groupBy: [],
            aggregations: [
              {
                column: "",
                function: "",
                alias: ""
              }
            ]
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Group", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_source",
          name: "source",
          type: "source",
          group: "IO",
          icon: "default.png",
          inputCount: 0,
          outputCount: 1,
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            dataset: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["IO", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_filter",
          name: "filter",
          type: "filter",
          group: "Transform",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            condition: "",
            sessionCache: "",
            interceptor: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Transform", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_supplement",
          name: "supplement",
          type: "supplement",
          group: "Gateway",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            supplementSchema: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Gateway", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_union",
          name: "union",
          type: "union",
          group: "Set",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            distinct: "false",
            sessionCache: "",
            interceptor: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Set", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_intersect",
          name: "intersect",
          type: "intersect",
          group: "Set",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {},
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Set", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_minus",
          name: "minus",
          type: "minus",
          group: "Set",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {},
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Set", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_top",
          name: "top",
          type: "top",
          group: "Group",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            limit: "",
            orderBy: [],
            sessionCache: "",
            interceptor: "",
            groupBy: [],
            limitType: "ROW_COUNT"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Group", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_join",
          name: "join",
          type: "join",
          group: "Join",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            joinType: "",
            sessionCache: "",
            interceptor: "",
            joinConditions: []
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Join", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_starjoin",
          name: "starjoin",
          type: "starjoin",
          group: "Join",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            sessionCache: "",
            interceptor: "",
            factTable: "",
            joinConditions: [
              {
                tableName: "",
                dimColumn: "",
                factColumn: ""
              }
            ]
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Join", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_productjoin",
          name: "productjoin",
          type: "productjoin",
          group: "Join",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {},
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Join", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_split",
          name: "split",
          type: "split",
          group: "Set",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            condition: "",
            sessionCache: "",
            interceptor: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Set", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_sink",
          name: "sink",
          type: "sink",
          group: "IO",
          icon: "default.png",
          inputCount: 1,
          outputCount: 0,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [],
          otherConfigurations: {
            schema: "",
            brokers: "",
            columns: "",
            groupId: "",
            description: "",
            sessionCache: "",
            interceptor: "",
            type: "HDFS",
            nullValue: "",
            mode: "",
            path: "",
            password: "",
            table: "",
            partitionColumns: "",
            format: "csv",
            maxFileSize: "",
            maxFileNumber: "",
            separator: ",",
            url: "",
            expiredTime: "0",
            driver: "",
            namespace: "",
            topic: "",
            dataset: "",
            user: "",
            sliceType: "",
            specifiedStringColumnTypes: []
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["IO", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_linearleastsquares_predict",
          name: "linearleastsquares_predict",
          type: "linearleastsquares_predict",
          group: "Datamining",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            featureColumns: [],
            labelColumn: "",
            modelPath: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Datamining", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_linearleastsquares_train",
          name: "linearleastsquares_train",
          type: "linearleastsquares_train",
          group: "Datamining",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            featureColumns: [],
            labelColumn: "score",
            stepSize: "1.0",
            modelPath: "",
            trainPortion: "0.7",
            miniBatchFraction: "1.0",
            trainIteration: "100"
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Datamining", "dataflow"],
          expiredPeriod: 0
        },
        {
          id: "spark_RandomForestPredictStep",
          name: "RandomForestPredictStep",
          type: "RandomForestPredictStep",
          group: "Datamining",
          icon: "default.png",
          inputCount: 1,
          outputCount: 1,
          inputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          outputConfigurations: [
            {
              id: "",
              fields: []
            }
          ],
          otherConfigurations: {
            featureColumns: [],
            labelColumn: "",
            modelPath: ""
          },
          creator: "SYSTEM",
          createTime: 1551936980000,
          lastModifier: "SYSTEM",
          lastModifiedTime: 1551936980000,
          owner: "SYSTEM",
          version: 1,
          enabled: 1,
          moduleVersion: 0,
          tags: ["Datamining", "dataflow"],
          expiredPeriod: 0
        }
      ]
    };
  },
  mounted() {
    this.gqueryTree = this.filterGquery(this.flowType);
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
  .gquery-item {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 90px;
      overflow: hidden;
      text-align: center;
      margin-top: 10px;
      i {
        font-size: 35px;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
