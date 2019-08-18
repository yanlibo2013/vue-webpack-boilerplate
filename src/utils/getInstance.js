import plumbGather from "jsplumb";

export default function(options) {
  let instance = plumbGather.jsPlumb.getInstance({
    // Endpoint : "Dot",
    // EndpointHoverStyle : null,
    // connectorStyle : { stroke:"#666" },
    //   // drag options
    // DragOptions: { cursor: "pointer", zIndex: 2000 },
    // // default to a gradient stroke from blue to green.
    // PaintStyle: {
    //     // gradient: { stops: [
    //     //     [ 0, "#0d78bc" ],
    //     //     [ 1, "#558822" ]
    //     // ] },
    //     stroke: "black",
    //     strokeWidth: 1
    // },
    // // Connector: ["Bezier", { curviness: 100 }],
    // Connector: 'Flowchart',
    Container: options.container
  });

  console.log("instance", instance);

  // instance.registerConnectionType("basicConnect", {
  //   paintStyle: {stroke: "${color}"},
  //   overlays:[
  //     [ "Label", {
  //       label: '${connectType}',
  //       cssClass: 'labelStyle',
  //       location: 30,
  //     }],
  //     [ "Arrow", {
  //       width: 10,
  //       height: 5,
  //       location: 0.6,
  //       paintStyle: { stroke: "${color}", fill: "${color}" },
  //     }]
  //   ]
  // })

  instance.bind("click", function(c) {
    console.log("instance.deleteConnection", c);
    instance.deleteConnection(c); //instance

    options.delConnections(c);
  });

  return instance;
}
