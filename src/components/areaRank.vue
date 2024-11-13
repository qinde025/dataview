<template>
  <div id="main3"></div>
</template>
<script>
import { rankAreas } from "@/apis/api"
import { moneyWanFormat } from "@/utils/common"
import * as echarts from 'echarts/lib/echarts';
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent, ToolboxComponent, DataZoomComponent } from 'echarts/components';
import { BarChart, LineChart, PictorialBarChart, PieChart } from 'echarts/charts';
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  GridComponent,
  BarChart,
  LineChart,
  PictorialBarChart,
  PieChart
]);


export default {
  name: "AreaRank",
  data () {
    return {
      option: {},
      myChart: null
    }
  },
  mounted () {
      this.initChart()
    this.startInterval()
  },
    methods:{
      initChart(){
          this.myChart = echarts.init(document.getElementById('main3'));
          rankAreas({}).then(res => {
              if (res?.status === "200") {
                  let arr0 = res?.data.map(item => {
                      return { ...item, _value: item?.value, value: item.amount }
                  });
                  let legendArr = res?.data.map(item => {
                      return item?.name ? item.name : '***'
                  })
                  this.option = {
                      grid: {
                          bottom: 70
                      },
                      tooltip: {
                          trigger: 'item',
                          formatter (param) {
                              return `<span style="font-weight:bold;font-size:16px">区域分布数据</span><br/>地区：${param.data.name}<br/> 贷款企业：${param.data._value}家 <br/> 贷款金额：${moneyWanFormat(param.data.amount)}万元`;
                          }
                      },
                      legend: {
                          left: '10',
                          // top: "5%",
                          itemWidth: 20,
                          itemHeight: 20,
                          selectedMode: false,
                          textStyle: {
                              color: "#00d9d5",
                              // fontSize: 16
                          },
                          data: legendArr
                      },
                      series: [
                          {
                              name: '贷款区域数据统计',
                              type: 'pie',
                              radius: ['40%', '60%'],
                              center: ['45%', '60%'],
                              roseType: "radius",
                              // avoidLabelOverlap: false,
                              data: arr0,
                              label: {
                                  color: "rgba(98,232,255,.85)",
                                  formatter: (item) => {
                                      return `企业：${item.data?._value}家\n金额:${moneyWanFormat(item.value)}万元`
                                  }
                              }
                          },
                      ],
                  }

                  this.$nextTick(() => {
                      this.option && this.myChart.setOption(this.option);
                  })
              }
          })
      },
        startInterval() {
            let This = this
            // 循环高亮
            var intervalId = setInterval(function () {
                This.initChart()
            }, 300000)
        },
    }
}
</script>
