export const flowData = {
  id: "402881d26cf56843016cfa0c26670004",
  name: "flow_22",
  steps: [
    {
      id: "rtc_source_1",
      name: "rtc_source",
      type: "source",
      stepSettings: {
        quoteChar: '"',
        escapeChar: "\\",
        brokers: "info3:9093",
        zookeeper:
          "maxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrderness",
        offset: "offset",
        maxOutOfOrderness:
          "maxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrderness",
        groupId: "groupId",
        datasetName: "gbj_test_kafka_dataset597759864576888",
        format: "csv",
        type: "KAFKA",
        separator: ",",
        nullValue:
          "nullValuenullValuenullValuenullValuenullValuenullValuenullValue",
        kafkaFetchSize:
          "1048576maxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrdernessmaxOutOfOrderness",
        autoOffsetReset: "earliest",
        timeColumn: "timeColumn",
        jsonSchema: "jsonSchema",
        schemaId: "4cfb43d7-6844-4710-85d4-b3d88b7e9593",
        kafkaVersion: "0.9",
        timeFormat:
          "yyyy-MM-dd HH:mm:ssyyyy-MM-dd HH:mm:ssyyyy-MM-dd HH:mm:ssyyyy-MM-dd HH:mm:ssyyyy-MM-dd HH:mm:ss",
        topic: "ka_kaka_kaka_kaka_kaka_kaka_kaka_ka"
      },
      outputConfigurations: {
        output: [
          { column: "sName", type: "string", alias: "", description: "" }
        ]
      },
      x: 12,
      y: 53
    },
    {
      id: "rtc_filter_2",
      name: "rtc_filter",
      type: "filter",
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
        output: [
          { column: "kpi_time", type: "string", alias: "", description: "" }
        ]
      },
      x: 307,
      y: 204
    },
    {
      id: "rtc_sink_3",
      name: "rtc_sink",
      type: "sink",
      stepSettings: {
        quoteChar: '"separator',
        path: "path",
        escapeChar: "\\separator",
        brokers: "separator",
        jsonSchema: "separator",
        format: "csv",
        topic: "separator",
        batchSize: "402653184",
        type: "HDFS",
        separator: ",separator",
        nullValue: "separator",
        version: "0.8"
      },
      inputConfigurations: { input: [] },
      x: 1241,
      y: 74
    },
    {
      id: "rtc_aggregate_4",
      name: "rtc_aggregate",
      type: "aggregate",
      stepSettings: {},
      inputConfigurations: { input: [] },
      outputConfigurations: { output: [] },
      x: 574,
      y: 222
    },
    {
      id: "rtc_transform_5",
      name: "rtc_transform",
      type: "transform",
      stepSettings: {},
      inputConfigurations: { input: [] },
      outputConfigurations: { output: [] },
      x: 824,
      y: 130
    },
    {
      id: "rtc_sql_6",
      name: "rtc_sql",
      type: "sql",
      stepSettings: {},
      inputConfigurations: { input: [] },
      outputConfigurations: { output: [] },
      x: 1029,
      y: 232
    }
  ],
  links: [
    {
      name: "con_831",
      source: "rtc_source_1",
      sourceOutput: "output",
      target: "rtc_filter_2",
      targetInput: "input",
      input: "input"
    },
    {
      name: "con_832",
      source: "rtc_filter_2",
      sourceOutput: "output",
      target: "rtc_aggregate_4",
      targetInput: "input",
      input: "input"
    },
    {
      name: "con_833",
      source: "rtc_aggregate_4",
      sourceOutput: "output",
      target: "rtc_transform_5",
      targetInput: "input",
      input: "input"
    },
    {
      name: "con_837",
      source: "rtc_transform_5",
      sourceOutput: "output",
      target: "rtc_sql_6",
      targetInput: "input",
      input: "input"
    },
    {
      name: "con_841",
      source: "rtc_sql_6",
      sourceOutput: "output",
      target: "rtc_sink_3",
      targetInput: "input",
      input: "input"
    }
  ],
  createTime: 1568084428989,
  lastModifyTime: 1568084428989
};
