<template>
  <component :is="setComponent"></component>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import sink from "./set/sink";
import source from "./set/source";
import split from "./set/split";
import { setInterval } from 'timers';
export default {
  props: ["nodeType"],
  components: {},
  data: function() {
    return {
      // setComponent:""
    };
  },
  computed: {
    setComponent() {
      switch (this.nodeType) {
        case "sink":
          return sink;
          // break;
        case "source":
          return source;
        case "split":
          return split;
        default:
          "";
      }
    }
  },
  mounted() {},
  beforeCreate() {},
  created() {
    console.log("steamflow node", this.nodeType);
  },
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {}
};
</script>

<style lang="scss">
</style>
