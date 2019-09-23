<template>
  <div class="html2canvas">
    <!-- SOURCE -->
    <h1>SOURCE</h1>
    <div ref="printMe" class="printMe">
      <h1>Print me!</h1>
    </div>
    <!-- OUTPUT -->
    <h1>OUTPUT</h1>
    <img :src="output" />
  </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  watch: {
    // flowData(val) {
    // }
  },
  props: {
    // data: {
    //   type: Object,
    //   default: false
    // }
  },
  components: {},
  data: function() {
    return {
      output: null
    };
  },
  computed: {
    //...mapState([""])
  },
  mounted() {
    this.print();
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    //...mapActions([""]),
    async print() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output = await this.$html2canvas(el, options);
    }
  }
};
</script>

<style lang="scss">
.html2canvas {
  .printMe {
    padding: 10px;
    background: #f5da55;
    > h1 {
      color:white;
    }
  }
}
</style>
