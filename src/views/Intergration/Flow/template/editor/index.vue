<template>
  <div class="editor">
    <div class="main">
      <div class="container">
        <div class="panzoom">
          <div class="diagram">
            <div id="i0" class="item">Root!</div>
            <div id="i1" class="item">Child 1</div>
            <div id="i11" class="item">Child 1.1</div>
            <div id="i12" class="item">Child 1.2</div>
            <div id="i2" class="item">Child 2</div>
            <div id="i21" class="item">Child 2.1</div>
            <div id="i3" class="item">Child 3</div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside">
      <rightaside></rightaside>
    </div>
  </div>
</template>


<script>
import { jsPlumb } from "jsplumb";
import $ from "jquery";
import { mapGetters, mapActions } from "vuex";
import rightaside from "./rightaside/index";
import _ from "lodash";
import dagre from "dagre";

require("jquery.panzoom");
require("jquery-ui-bundle");
require("jquery-ui/ui/widgets/draggable");
export default {
  components: {
    rightaside
  },
  data: function() {
    return {};
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    init() {
      var minScale = 0.4;
      var maxScale = 2;
      var incScale = 0.1;
      var plumb = null;
      var $container = $(".container");
      var $diagram = $container.find(".diagram");
      var $panzoom = null;
      var links = [
        { from: "i0", to: "i1" },
        { from: "i1", to: "i11" },
        { from: "i1", to: "i12" },
        { from: "i0", to: "i2" },
        { from: "i2", to: "i21" },
        { from: "i0", to: "i3" }
      ];

      jsPlumb.ready(function() {
        plumb = jsPlumb.getInstance({
          PaintStyle: { strokeWidth: 1 },
          Anchors: [["Left", "Right", "Bottom"], ["Top", "Bottom"]],
          Container: $diagram
        });
        _.each(links, function(link) {
          plumb.connect({
            source: link.from,
            target: link.to,
            connector: [
              "Flowchart",
              {
                cornerRadius: 3,
                stub: 16
              }
            ],
            endpoints: ["Blank", "Blank"],
            overlays: [["Arrow", { location: 1, width: 10, length: 10 }]]
          });
        });
        var dg = new dagre.graphlib.Graph();
        dg.setGraph({ nodesep: 30, ranksep: 30, marginx: 50, marginy: 50 });
        dg.setDefaultEdgeLabel(function() {
          return {};
        });
        $container.find(".item").each(function(idx, node) {
          var $n = $(node);
          var box = {
            width: Math.round($n.outerWidth()),
            height: Math.round($n.outerHeight())
          };
          dg.setNode($n.attr("id"), box);
        });
        plumb.getAllConnections().forEach(function(edge) {
          dg.setEdge(edge.source.id, edge.target.id);
        });
        dagre.layout(dg);
        var graphInfo = dg.graph();
        dg.nodes().forEach(function(n) {
          var node = dg.node(n);
          var top = Math.round(node.y - node.height / 2) + "px";
          var left = Math.round(node.x - node.width / 2) + "px";
          $("#" + n).css({ left: left, top: top });
        });
        plumb.repaintEverything();
        _.defer(function() {
          $panzoom = $container
            .find(".panzoom")
            .panzoom({
              minScale: minScale,
              maxScale: maxScale,
              increment: incScale,
              cursor: "",
              ignoreChildrensEvents: true
            })
            .on("panzoomstart", function(e, pz, ev) {
              $panzoom.css("cursor", "move");
            })
            .on("panzoomend", function(e, pz) {
              $panzoom.css("cursor", "");
            });
          $panzoom
            .parent()
            .on("mousewheel.focal", function(e) {
              if (e.ctrlKey || e.originalEvent.ctrlKey) {
                e.preventDefault();
                var delta = e.delta || e.originalEvent.wheelDelta;
                var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
                $panzoom.panzoom("zoom", zoomOut, {
                  animate: true,
                  exponential: false
                });
              } else {
                e.preventDefault();
                var deltaY =
                  e.deltaY ||
                  e.originalEvent.wheelDeltaY ||
                  -e.originalEvent.deltaY;
                var deltaX =
                  e.deltaX ||
                  e.originalEvent.wheelDeltaX ||
                  -e.originalEvent.deltaX;
                $panzoom.panzoom("pan", deltaX / 2, deltaY / 2, {
                  animate: true,
                  relative: true
                });
              }
            })
            .on("mousedown touchstart", function(ev) {
              var matrix = $container.find(".panzoom").panzoom("getMatrix");
              var offsetX = matrix[4];
              var offsetY = matrix[5];
              var dragstart = {
                x: ev.pageX,
                y: ev.pageY,
                dx: offsetX,
                dy: offsetY
              };
              $(ev.target).css("cursor", "move");
              $(this).data("dragstart", dragstart);
            })
            .on("mousemove touchmove", function(ev) {
              var dragstart = $(this).data("dragstart");
              if (dragstart) {
                var deltaX = dragstart.x - ev.pageX;
                var deltaY = dragstart.y - ev.pageY;
                var matrix = $container.find(".panzoom").panzoom("getMatrix");
                matrix[4] = parseInt(dragstart.dx) - deltaX;
                matrix[5] = parseInt(dragstart.dy) - deltaY;
                $container.find(".panzoom").panzoom("setMatrix", matrix);
              }
            })
            .on("mouseup touchend touchcancel", function(ev) {
              $(this).data("dragstart", null);
              $(ev.target).css("cursor", "");
            });
        });
        var currentScale = 1;
        $container.find(".diagram .item").draggable({
          start: function(e) {
            var pz = $container.find(".panzoom");
            currentScale = pz.panzoom("getMatrix")[0];
            $(this).css("cursor", "move");
            pz.panzoom("disable");
          },
          drag: function(e, ui) {
            ui.position.left = ui.position.left / currentScale;
            ui.position.top = ui.position.top / currentScale;
            if ($(this).hasClass("jsplumb-connected")) {
              plumb.repaint($(this).attr("id"), ui.position);
            }
          },
          stop: function(e, ui) {
            var nodeId = $(this).attr("id");
            if ($(this).hasClass("jsplumb-connected")) {
              plumb.repaint(nodeId, ui.position);
            }
            $(this).css("cursor", "");
            $container.find(".panzoom").panzoom("enable");
          }
        });
      });
      // var minScale = 0.4;
      // var maxScale = 2;
      // var incScale = 0.1;
      // var plumb = null;
      // var $container = $(".container");
      // var $diagram = $container.find(".diagram");

      // var $panzoom = null;
      // var links = [
      //   { from: "i0", to: "i1" },
      //   { from: "i1", to: "i11" },
      //   { from: "i1", to: "i12" },
      //   { from: "i0", to: "i2" },
      //   { from: "i2", to: "i21" },
      //   { from: "i0", to: "i3" }
      // ];

      // jsPlumb.ready(function() {
      //   plumb = jsPlumb.getInstance({
      //     PaintStyle: { strokeWidth: 1 },
      //     Anchors: [["Left", "Right", "Bottom"], ["Top", "Bottom"]],
      //     Container: $diagram
      //   });

      //   console.log("jsplumb", plumb);
      //   _.each(links, function(link) {
      //     plumb.connect({
      //       source: link.from,
      //       target: link.to,
      //       connector: [
      //         "Flowchart",
      //         {
      //           cornerRadius: 3,
      //           stub: 16
      //         }
      //       ],
      //       endpoints: ["Blank", "Blank"],
      //       overlays: [["Arrow", { location: 1, width: 10, length: 10 }]]
      //     });
      //   });
      //   var dg = new dagre.graphlib.Graph();
      //   dg.setGraph({ nodesep: 30, ranksep: 30, marginx: 50, marginy: 50 });
      //   dg.setDefaultEdgeLabel(function() {
      //     return {};
      //   });
      //   $container.find(".item").each(function(idx, node) {
      //     var $n = $(node);
      //     var box = {
      //       width: Math.round($n.outerWidth()),
      //       height: Math.round($n.outerHeight())
      //     };
      //     dg.setNode($n.attr("id"), box);
      //   });
      //   plumb.getAllConnections().forEach(function(edge) {
      //     dg.setEdge(edge.source.id, edge.target.id);
      //   });
      //   dagre.layout(dg);
      //   var graphInfo = dg.graph();
      //   dg.nodes().forEach(function(n) {
      //     var node = dg.node(n);
      //     var top = Math.round(node.y - node.height / 2) + "px";
      //     var left = Math.round(node.x - node.width / 2) + "px";
      //     $("#" + n).css({ left: left, top: top });
      //   });
      //   plumb.repaintEverything();
      //   _.defer(function() {
      //     $panzoom = $container
      //       .find(".diagram")
      //       .panzoom({
      //         minScale: minScale,
      //         maxScale: maxScale,
      //         increment: incScale,
      //         cursor: "",
      //         ignoreChildrensEvents: true
      //       })
      //       .on("panzoomstart", function(e, pz, ev) {
      //         $panzoom.css("cursor", "move");
      //         console.log("panzoom start");
      //       })
      //       .on("panzoomend", function(e, pz) {
      //         $panzoom.css("cursor", "");
      //       });
      //     $panzoom
      //       .parent()
      //       .on("mousewheel.focal", function(e) {
      //         if (e.ctrlKey || e.originalEvent.ctrlKey) {
      //           e.preventDefault();
      //           var delta = e.delta || e.originalEvent.wheelDelta;
      //           var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      //           $panzoom.panzoom("zoom", zoomOut, {
      //             animate: true,
      //             exponential: false
      //           });
      //         } else {
      //           e.preventDefault();
      //           var deltaY =
      //             e.deltaY ||
      //             e.originalEvent.wheelDeltaY ||
      //             -e.originalEvent.deltaY;
      //           var deltaX =
      //             e.deltaX ||
      //             e.originalEvent.wheelDeltaX ||
      //             -e.originalEvent.deltaX;
      //           $panzoom.panzoom("pan", deltaX / 2, deltaY / 2, {
      //             animate: true,
      //             relative: true
      //           });
      //         }
      //       })
      //       .on("mousedown touchstart", function(ev) {
      //         var matrix = $container.find(".diagram").panzoom("getMatrix");
      //         var offsetX = matrix[4];
      //         var offsetY = matrix[5];
      //         var dragstart = {
      //           x: ev.pageX,
      //           y: ev.pageY,
      //           dx: offsetX,
      //           dy: offsetY
      //         };
      //         $(ev.target).css("cursor", "move");
      //         $(this).data("dragstart", dragstart);
      //       })
      //       .on("mousemove touchmove", function(ev) {
      //         var dragstart = $(this).data("dragstart");
      //         if (dragstart) {
      //           var deltaX = dragstart.x - ev.pageX;
      //           var deltaY = dragstart.y - ev.pageY;
      //           var matrix = $container.find(".diagram").panzoom("getMatrix");
      //           matrix[4] = parseInt(dragstart.dx) - deltaX;
      //           matrix[5] = parseInt(dragstart.dy) - deltaY;
      //           $container.find(".diagram").panzoom("setMatrix", matrix);
      //         }
      //       })
      //       .on("mouseup touchend touchcancel", function(ev) {
      //         $(this).data("dragstart", null);
      //         $(ev.target).css("cursor", "");
      //       });

      //     console.log(
      //       ' $container.find(".diagram .item")',
      //       $container.find(".diagram .item")
      //     );
      //     console.log($container.find(".diagram .item").draggable);

      //     var currentScale = 1;
      //     $container.find(".diagram .item").draggable({
      //       start: function(e) {
      //         console.log("start");
      //         var pz = $container.find(".diagram");
      //         currentScale = pz.panzoom("getMatrix")[0];
      //         $(this).css("cursor", "move");
      //         pz.panzoom("disable");
      //       },
      //       drag: function(e, ui) {
      //         ui.position.left = ui.position.left / currentScale;
      //         ui.position.top = ui.position.top / currentScale;
      //         if ($(this).hasClass("jsplumb-connected")) {
      //           plumb.repaint($(this).attr("id"), ui.position);
      //         }
      //       },
      //       stop: function(e, ui) {
      //         var nodeId = $(this).attr("id");
      //         if ($(this).hasClass("jsplumb-connected")) {
      //           plumb.repaint(nodeId, ui.position);
      //         }
      //         $(this).css("cursor", "");
      //         $container.find(".diagram").panzoom("enable");
      //       }
      //     });
      //   });
      // });
    }
  }
};
</script>

<style lang="scss">
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
    // background-image: url("../../../../../assets/editor/designBg.png");
  }
  .aside {
    width: 250px;
  }

  $EntityTypeColor: #00bfff;
  .container {
    // background-color: black;
    color: $EntityTypeColor;
    background-image: url("../../../../../assets/editor/designBg.png");
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // top: 0;
  }

  .panzoom {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    overflow: hidden;

    width: calc(100vw - 450px);
    // width: 500px;
    // height: 250px;
    // background-color: rgba(blue, 0.1);
    // left: 50px;
    // top: 20px;
    // overflow: visible;
    //border: 5px dotted rgba(#ccc, 0.1);
  }
  .diagram {
    position: absolute;
  }
  .item {
    cursor: pointer;
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    border: 1px solid darken($EntityTypeColor, 30%);
    padding: 8px;
    border-radius: 3px;
    background-color: rgba($EntityTypeColor, 0.2);
    &:hover {
      border: 1px solid $EntityTypeColor;
    }
  }

  .jsplumb-connector path {
    stroke: $EntityTypeColor;
  }
}
</style>
