//节点类型
export function nodeClass(type) {
  switch (type) {
    //dataflow 端点左1，右-1
    case "source":
    case "sqlsource":
    case "streaming_source":
      return "classD_A";
      break;
    //dataflow 端点左1
    case "sink":
    case "show":
      return "classD_B";
      break;
    //dataflow 端点左-1，右-1
    case "union":
    case "intersect":
    case "starjoin":
      return "classD_C";
      break;
    //dataflow 端点左1，右2 -1
    case "decision":
    case "split":
    case "validate":
      return "classD_D";
      break;
    //dataflow 端点左2 1，右1
    case "join":
    case "productjoin":
    case "minus":
      return "classD_E";
      break;
    //workflow 端点左-1，右-1
    case "dataflow":
    case "hawq":
    case "hive":
    case "mapreduce":
    case "shell":
    case "spark":
    case "event":
    case "exclusive":
    case "parallel":
      return "classW_C";
      break;
    //other 端点左1，右1
    default:
      return "classO";
      break;
  }
}

//字体图标的变量（需跟iconFont字体包同步）
var nodeIconFont = {
  source: "source",
  sqlsource: "sqlsource",
  sink: "sink",
  decision: "decision",
  validate: "validate",
  supplement: "supplement",
  sql: "sql",
  transform: "transform",
  filter: "filter",
  sample: "sample",
  lookup: "lookup",
  join: "join",
  starjoin: "starjoin",
  productjoin: "productjoin",
  aggregate: "aggregate",
  top: "top",
  union: "union",
  intersect: "intersect",
  minus: "minus",
  split: "split",
  Correlation: "Correlation",
  Summary: "Summary",
  gradientboogradientbostedtrees_predict:
    "gradientboogradientbostedtrees_predict",
  MultilayerPerceptronPredict: "MultilayerPerceptronPredict",
  MultilayerPerceptronTrain: "MultilayerPerceptronTrain",
  kmeans_predict: "kmeans_predict",
  kmeans_train: "kmeans_train"
};
//节点图标函数
export function nodeIcon(type) {
  if (type in nodeIconFont) {
    return "iconTrue";
  } else {
    return false;
  }
}

export function specialNodeClass(type) {
  switch (type) {
    //dataflow 左1 右2 yse -1 no -1
    case "decision":
    case "split":
      return "classD_D1";
    //dataflow 左1 右2 ok -1 error -1
    case "validate":
      return "classD_D2";
    //dataflow 左2 left 1 right 1 右-1
    case "join":
    case "productjoin":
      return "classD_E1";
    //dataflow 左2 input1 1 input2 1 right 1 右-1
    case "minus":
      return "classD_E2";
    //worflow 特殊节点 左-1 右-1
    case "dataflow":
      return "classW_A";
  }
}

/**
 *
 * jsPlumb设计器 设置参数
 * ------------------------------------------------------------------
 */
export var connectorPaintStyle = {
  //基本连接线样式
  strokeWidth: 2,
  stroke: "#4e5568",
  joinstyle: "round",
  outlineColor: "white",
  outlineWidth: 0
};
export var connectorHoverStyle = {
  // 鼠标悬浮在连接线上的样式
  strokeWidth: 3,
  stroke: "#ff4e4e",
  outlineColor: "white",
  outlineWidth: 0
};
export var origin = {
  //起点
  endpoint: ["Dot", { radius: 8 }], //端点的形状
  connectorStyle: connectorPaintStyle, //连接线的颜色，大小样式
  connectorHoverStyle: connectorHoverStyle,
  paintStyle: {
    stroke: "#4e5568",
    fill: "transparent",
    radius: 6,
    lineWidth: 6
  }, //端点的颜色样式
  //anchor: "AutoDefault",
  isSource: true, //是否可以拖动（作为连线起点）
  connector: [
    "Flowchart",
    { stub: [5, 5], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
  ], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
  isTarget: false, //是否可以放置（连线终点）
  maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
};
export var destination = {
  //终点
  endpoint: ["Dot", { radius: 6 }], //端点的形状
  connectorStyle: connectorPaintStyle, //连接线的颜色，大小样式
  connectorHoverStyle: connectorHoverStyle,
  paintStyle: { fill: "#4e5568" }, //端点的颜色样式
  isSource: false, //是否可以拖动（作为连线起点）
  connector: [
    "Straight",
    { stub: [5, 5], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
  ], //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
  isTarget: true, //是否可以放置（连线终点）
  maxConnections: 1, // 设置连接点最多可以连接几条线,-1表示无限大
  connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
};

export const addEndpointToNode = (
  drawType,
  dataIndex,
  jsplumbInstance,
  self,
  links
) => {
  self.$nextTick(() => {
    //节点锚点添加
    //左侧无，右侧一个起点
    if (nodeClass(drawType) == "classD_A") {
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "RightMiddle", maxConnections: 100 },
        { uuid: dataIndex + "output" + "origin", ...origin }
      );
    } else if (nodeClass(drawType) == "classD_B") {
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "LeftMiddle" },
        { uuid: dataIndex + "input" + "destination", ...destination }
      );
    } else if (
      nodeClass(drawType) == "classD_C" ||
      nodeClass(drawType) == "classW_C"
    ) {
      //左侧一个终点（多），右侧起点(多)
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "LeftMiddle", maxConnections: -1 },
        { uuid: dataIndex + "input" + "destination", ...destination }
      );
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "RightMiddle", maxConnections: -1 },
        { uuid: dataIndex + "output" + "origin", ...origin }
      );
    } else if (specialNodeClass(drawType) == "classD_D1") {
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "LeftMiddle" },
        { uuid: dataIndex + "input" + "destination", ...destination }
      );
    } else if (specialNodeClass(drawType) == "classD_D2") {
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "LeftMiddle" },
        { uuid: dataIndex + "input" + "destination", ...destination }
      );
    } else if (specialNodeClass(drawType) == "classD_E1") {
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "RightMiddle", maxConnections: -1 },
        { uuid: dataIndex + "output" + "origin", ...origin }
      );
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "RightMiddle", maxConnections: -1 },
        { uuid: dataIndex + "output" + "origin", ...origin }
      );
      jsplumbInstance.addEndpoint(
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
      jsplumbInstance.addEndpoint(
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
        { uuid: dataIndex + "input2" + "destination", ...destination }
      );
    } else {
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "RightMiddle", maxConnections: -1 },
        { uuid: dataIndex + "output" + "origin", ...origin }
      );
      jsplumbInstance.addEndpoint(
        dataIndex,
        { anchors: "LeftMiddle" },
        { uuid: dataIndex + "input" + "destination", ...destination }
      );
    }
    jsplumbInstance.draggable(dataIndex, { containment: "parent" }); //节点拖动
    //节点之间连线
    links.forEach((item, index) => {
      jsplumbInstance.connect({
        uuids: [
          item.source + item.sourceOutput + "origin",
          item.target + item.input + "destination"
        ]
      });
    });
    return dataIndex;
  });
};
