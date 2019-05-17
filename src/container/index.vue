<template>
  <el-container class="container">
    <el-header>
      <vheader></vheader>
    </el-header>
    <el-container>
      <el-main>
        <app-main/>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import vheader from "@/components/Header/index";
import AppMain from "./AppMain";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { vheader, AppMain },
  data: function() {
    return {};
  },
  computed: {},
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {}
};
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>
