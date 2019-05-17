<template>
  <div>
    <!-- <h1>{{$route.params.id}}</h1> -->
    <transition name="fade-transform" mode="out-in">
      <component :is="$route.params.id==1?vform:$route.params.id==2?vtable:editor"></component>
    </transition>
  </div>
</template>


<script>
import vtable from "./template/table";
import vform from "./template/form";
import editor from "./template/editor";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    // vtable,
    // vform
  },
  data: function() {
    return {
      currentView: vtable,
      vtable: vtable,
      vform: vform,
      editor: editor
    };
  },
  computed: {},
  mounted() {
    console.log("mounted children");
  },
  beforeCreate() {},
  created() {
    console.log("created children");
  },
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {},
  activated() {
    console.log("children activated", this.$route.params.id);
  },
  deactivated() {
    console.log("children deactivated", this.$route.params.id);
  }
};
</script>

<style lang="scss">
</style>
