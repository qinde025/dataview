<template>
    <div id="product-board">
        <div class="board-title">融资按产品统计</div>
        <div id="main2"></div>
    </div>
</template>
<script>
import { rankProds } from "@/apis/api"
import { moneyWanFormat } from "@/utils/common"
import * as echarts from 'echarts/lib/echarts';
import { TitleComponent } from 'echarts/components';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { ToolboxComponent } from 'echarts/components';
import { DataZoomComponent } from 'echarts/components';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { LineChart } from 'echarts/charts';
import { PictorialBarChart } from 'echarts/charts';
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  GridComponent,
  BarChart,
  LineChart,
  PictorialBarChart
]);


export default {
  name: "ProdChart",
  data () {
    return {
      option: {},
      myChart: null
    }
  },
    methods:{
      initChart(){
          this.myChart = echarts.init(document.getElementById('main2'));
          rankProds({}).then(res => {
              if (res?.status === "200") {
                  let arrName = []
                  let arr = res.data.map((item) => {
                      arrName.push(item?.name)
                      return { name: item?.name, _value: item.applicant_count, value: item.amount };
                  });
                  this.option = {
                      // title: { name: "产品Top5" },
                      // backgroundColor: 'rgba(0,225,225,.1)',
                      grid: {
                          top: '20px',
                          left: '20px',
                          right: '60px',
                          bottom: '30px',
                          containLabel: true,
                      },
                      toolbox: {
                          show: true,
                          feature: {
                              mark: { show: true },
                          },
                      },
                      tooltip: {
                          trigger: 'item',
                          formatter: function (value) {
                              return `<span style="font-weight:bold;font-size:16px">${value.name}</span><br/>融资申请金额：${moneyWanFormat(value.value)}万元 <br/> `;
                          },
                      },
                      xAxis: {
                          type: 'value',
                          splitLine: {
                              show: false,
                          },
                          data: [],
                          axisLabel: {
                              show: false
                          },
                      },
                      yAxis: {
                          type: 'category',
                          // name: "笔数",
                          axisLabel: {
                              show: true,
                              inside: true,
                              color: "#59baf2",
                              margin: "0",
                              // fontSize: 16,
                              formatter: function (val) {
                                  // return `<span style="font-weight:bold;font-size:16px">value</span><br/>融资申请金额：moneyWanFormat(value)万元<br/>`;
                                  return `${val}\n\n\n`
                                  // return `<div style="position:relative"><span style="position:absolute;top:-30px">1</span></div>`
                              }
                          },

                          axisTick: {
                              show: false
                          },
                          axisLine: {
                              show: false,
                              lineStyle: {
                                  color: "#c9fffe"
                              }
                          },
                          splitLine: {
                              show: false,
                              lineStyle: {
                                  color: "#0b3f60"
                              }
                          },
                          data: arrName
                      },
                      series: [
                          {
                              // name: '金额',
                              type: 'bar',
                              barWidth: 12,
                              itemStyle: {
                                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                      { offset: 0, color: '#00c8ff' },
                                      { offset: 1, color: '#0069f2' }
                                  ])
                              },
                              label: {
                                  show: true,
                                  color: "#58f2ff",
                                  // position: ["0", "-20"],
                                  position: "right",
                                  inside: false,
                                  // fontSize: 16,
                                  formatter: (param) => {
                                      return moneyWanFormat(param.data.value) + "万元"
                                  }
                              },
                              data: arr,
                              formater: {}
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
    },
  mounted () {
      this.initChart()
      this.startInterval()
  }
}
</script>
<style>
#product-board {
    height: 100%;
    display: flex;
    flex-direction: column;

    .board-title {
        height: 30px;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        padding: 15px 10px 0  10px;
        color: #43D0D6;
    }

    #main2 {
        height: 90%;
        width: 95%;
    }
}
</style>
