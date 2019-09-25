<template>
  <div class="shape">
    <h1>正方形</h1>
    <div id="square"></div>
    <h1>长方形</h1>
    <div id="rectangle"></div>
    <h1>圆形</h1>
    <div id="circle"></div>
    <h1>椭圆</h1>
    <div id="oval"></div>
    <h1>上三角</h1>
    <div id="triangle-up"></div>
    <h1>下三角</h1>
    <div id="triangle-down"></div>
    <h1>左三角</h1>
    <div id="triangle-left"></div>
    <h1>右三角</h1>
    <div id="triangle-right"></div>
    <h1>左上三角</h1>
    <div id="triangle-topleft"></div>
    <h1>右上三角</h1>
    <div id="triangle-topright"></div>
    <h1>左下三角</h1>
    <div id="triangle-bottomleft"></div>
    <h1>右下三角</h1>
    <div id="triangle-bottomright"></div>
    <h1>平行四边形</h1>
    <div id="parallelogram"></div>
    <h1>梯形</h1>
    <div id="trapezoid"></div>
    <h1>六角星</h1>
    <div id="star-six"></div>
    <h1>五角星</h1>
    <div id="star-five"></div>
    <h1>五角大楼</h1>
    <div id="pentagon"></div>
    <h1>六边形</h1>
    <div id="hexagon"></div>
    <h1>八角形</h1>
    <div id="octagon"></div>
    <h1>爱心</h1>
    <div id="heart"></div>
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
    return {};
  },
  computed: {
    //...mapState([""])
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    //...mapActions([""]),
  }
};
</script>

<style lang="scss">
.shape {
  margin: 8px;
  /*正方形*/
  #square {
    width: 100px;
    height: 100px;
    background: red;
  }
  /*长方形 */
  #rectangle {
    width: 200px;
    height: 100px;
    background: red;
  }
  /*圆形*/
  #circle {
    width: 100px;
    height: 100px;
    background: red;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
  /*椭圆*/
  #oval {
    width: 200px;
    height: 100px;
    background: red;
    -moz-border-radius: 100px / 50px;
    -webkit-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
  }
  /*上三角*/
  #triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
  }
  /*下三角*/
  #triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
  }
  /*左三角*/
  #triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
  }
  /*右三角*/
  #triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
  }
  /*左上三角*/
  #triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
  }
  /*右上三角*/
  #triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
  }
  /*左下三角*/
  #triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
  }
  /*右下三角*/
  #triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
  }
  /*平行四边形*/
  #parallelogram {
    width: 150px;
    height: 100px;
    margin-left: 20px;
    transform: skew(20deg);
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    background: red;
  }
  /*梯形*/
  #trapezoid {
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 100px;
  }
  /*六角星*/
  #star-six {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
    position: relative;
    &:after {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 100px solid red;
      position: absolute;
      content: "";
      top: 30px;
      left: -50px;
    }
  }
  /*五角星*/
  #star-five {
    margin: 50px 0;
    position: relative;
    display: block;
    color: red;
    width: 0px;
    height: 0px;
    border-right: 100px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    -moz-transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    -o-transform: rotate(35deg);
    &:before {
      border-bottom: 80px solid red;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      position: absolute;
      height: 0;
      width: 0;
      top: -45px;
      left: -65px;
      display: block;
      content: "";
      transform: rotate(-35deg);
      -webkit-transform: rotate(-35deg);
      -moz-transform: rotate(-35deg);
      -ms-transform: rotate(-35deg);
      -o-transform: rotate(-35deg);
    }
    &:after {
      position: absolute;
      display: block;
      color: red;
      top: 3px;
      left: -105px;
      width: 0px;
      height: 0px;
      border-right: 100px solid transparent;
      border-bottom: 70px solid red;
      border-left: 100px solid transparent;
      transform: rotate(-70deg);
      -webkit-transform: rotate(-70deg);
      -moz-transform: rotate(-70deg);
      -ms-transform: rotate(-70deg);
      -o-transform: rotate(-70deg);
      content: "";
    }
  }
  /*五角大楼*/
  #pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: red transparent;
    &:before {
      content: "";
      position: absolute;
      height: 0;
      width: 0;
      top: -85px;
      left: -18px;
      border-width: 0 45px 35px;
      border-style: solid;
      border-color: transparent transparent red;
    }
  }
  /*六边形*/
  #hexagon {
    width: 100px;
    height: 55px;
    background: red;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: -25px;
      left: 0;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 25px solid red;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -25px;
      left: 0;
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-top: 25px solid red;
    }
  }
  /*八角形*/
  #octagon {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 29px solid red;
      border-left: 29px solid #eee;
      border-right: 29px solid #eee;
      width: 42px;
      height: 0;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      border-top: 29px solid red;
      border-left: 29px solid #eee;
      border-right: 29px solid #eee;
      width: 42px;
      height: 0;
    }
  }
  /*爱心*/
  #heart {
    position: relative;
    width: 100px;
    height: 90px;
    &:after {
      left: 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -webkit-transform-origin: 100% 100%;
      -moz-transform-origin: 100% 100%;
      -ms-transform-origin: 100% 100%;
      -o-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
  }
  #heart:before,
  #heart:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: red;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }
}
</style>
