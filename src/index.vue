<template>
    <dv-full-screen-container>
        <top-header class="top"/>
        <digital-flop class="flop"/>
        <div class="main-content">
            <div class="block-main">
                <dv-border-box-13 >
                    <ranking-board/>
                </dv-border-box-13>
                <dv-border-box-13 >
                    <credit-chart    />
                </dv-border-box-13>
            </div>
            <div class="block-main-center">
                <dv-border-box-8 dur=60>
                    <FlyLineChart area="ahs"/>
                </dv-border-box-8>
            </div>
            <div class="block-main">
                <dv-border-box-13>
<!--                    <scrollBoard />-->
                    <ProductScroll  />
                </dv-border-box-13>
                <dv-border-box-13>
                    <rose-chart/>
                </dv-border-box-13>
            </div>
        </div>

    </dv-full-screen-container>
</template>

<script>
import topHeader from './components/topHeader'
import digitalFlop from './components/digitalFlop'
import rankingBoard from './components/rankingBoard'
import roseChart from './components/roseChart'
import scrollBoard from './components/scrollBoard'
import AreaChart from "@/components/areaRank.vue";
import creditChart from "@/components/creditChart.vue";
import ProdChart from "@/components/productRank.vue";
import FlyLineChart from "@/components/flyLine.vue";
import ProductScroll from "@/components/productScroll.vue";

export default {
  name: 'DataView',
  components: {
      FlyLineChart,
    topHeader,
    digitalFlop,
    rankingBoard,
    roseChart,
    // scrollBoard,
      creditChart,
      // ProdChart,
      ProductScroll
      // AreaChart
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">

#dv-full-screen-container {
  background-image: url("./assets/bg.jpg");
  background-size: 100% 100%;
  box-shadow: 0 0 3px blue;
  display: flex;
  flex-direction: column;
  color: #43D0D6;
}
.top {
    height: 10vh;
}
.flop {
    height: 15vh;
}
.main-content {
  height: 74vh;
  display: flex;
    flex-direction: row;
}
.block-main {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
}
.block-main-center {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 40%;
}
</style>