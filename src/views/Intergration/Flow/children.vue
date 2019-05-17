<template>
  <div>
    <h1>{{$route.params.id}}</h1>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: function() {
    return {};
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
