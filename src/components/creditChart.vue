<template>
    <div id="credit-board">
      <div class="board-title">贷款按银行统计</div>
      <div id="CreditChart"></div>
    </div>
</template>
<script>
import { creditDataList } from "@/apis/api"
import { moneyWanFormat } from "@/utils/common"
import * as echarts from 'echarts/lib/echarts';
import { TitleComponent, TooltipComponent, LegendComponent, ToolboxComponent, DataZoomComponent, GridComponent } from 'echarts/components';
import { BarChart, LineChart, PictorialBarChart } from 'echarts/charts';
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
  name: "CreditChart",
  data () {
    return {
      option: {},
      pathSymbols: {
        num: "path://M1619.89139013 247.47083706h3438.87911807v529.05832588H1619.89139013V247.47083706z",
        amount: "path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521"
      },
      myChart: null
    }
  },
    methods:{
      initChart() {
          this.myChart = echarts.init(document.getElementById('CreditChart'));
          creditDataList({}).then(res => {
              if (res?.status === "200") {
                  let numArrs = []
                  let creditNums = []
                  let resource = res.data.reverse()
                  let numArr = resource.map((item) => {
                      numArrs.push(Number((item.creditAmountSum / 10000).toFixed(2)))
                      return { value: Number(moneyWanFormat(item.creditAmountSum)), symbol: this.pathSymbols.num }
                  });
                  let leftMax = Math.max(...numArrs);
                  let creditNum = resource.map((item) => {
                      creditNums.push(item.creditCnt)
                      return { value: item.creditCnt, symbol: this.pathSymbols.num }
                  });
                  let rightMax = Math.max(...creditNums);
                  let financeName = resource.map((item) => {
                      return item.financialName;
                  });
                  this.option = {
                      grid: {
                          top: 40,
                          left: 30,
                          right: 30,
                          bottom: 0,
                          containLabel: true,
                      },
                      tooltip: {
                          trigger: 'axis',
                          backgroundColor: 'rgba(1, 13, 19, 0.5)',
                          borderWidth: 0,
                          axisPointer: {
                              type: 'shadow',
                              label: {
                                  show: true,
                              },
                          },
                          textStyle: {
                              color: ['rgba(255,255,255,.8)'],
                          },
                          extraCssText: 'z-index:2',
                      },
                      legend: {
                          left: 20,
                          top: 0,
                          itemHeight: 15,
                          itemGap: 15,
                          borderRadius: 4,
                          textStyle: {
                              color: '#59baf2',
                          },
                          data: ['授信笔数', '授信金额'],
                      },
                      xAxis: {
                          axisPointer: {
                              label: {
                                  show: true,
                                  margin: 30
                              }
                          },
                          splitLine: {
                              show: false
                          },
                          axisLabel: {
                              show: true,
                              margin: 10,
                              //   fontSize: 20,
                              textStyle: {
                                  color: '#59baf2', //X轴文字颜色
                              }
                          },
                          axisTick: { show: false },
                          axisLine: { show: false },
                          inverse: true,
                          data: financeName
                      },
                      yAxis: [
                          {
                              type: 'value',
                              data: "value",
                              name: '金额(万元)',
                              min: 0,
                              max: leftMax,

                              nameTextStyle: {
                                  color: '#59baf2',
                                  // fontSize: 20,
                                  padding: [20, 0, 10, 0], // 四个数字分别为上右下左与原位置距离
                              },
                              nameGap: 10, // 表现为上下位置
                              position: 'right',

                              splitLine: {
                                  show: false,
                              },
                              axisTick: {
                                  show: false,
                              },
                              axisLine: {
                                  show: false,
                              },
                              axisLabel: {
                                  show: true,
                                  interval: 0,
                                  textStyle: {
                                      color: '#59baf2',
                                      //   fontSize: 20,
                                  },
                              },
                          },
                          {
                              type: 'value',
                              data: "value",
                              name: '笔数',
                              min: 0,
                              max: rightMax,
                              id: "bar2",
                              nameGap: 8, // 表现为上下位置
                              nameTextStyle: {
                                  padding: [20, 10, 0, 0],
                                  color: '#59baf2',
                                  // fontSize: 20,
                              },
                              splitLine: {
                                  show: true,
                                  lineStyle: {
                                      color: '#012592',
                                  },
                              },
                              axisTick: {
                                  show: false,
                              },
                              axisLine: {
                                  show: false,
                              },

                              axisLabel: {
                                  show: true,
                                  textStyle: {
                                      color: '#59baf2',
                                      //   fontSize: 20,
                                  },
                              },
                          },
                      ],
                      series: [
                          {
                              name: '授信笔数',
                              type: 'pictorialBar',
                              id: "bar1",
                              symbolRepeat: true,
                              symbolSize: ['30%', '20%'],
                              barCategoryGap: '40%',
                              barWidth:40,
                              itemStyle: {
                                  // gradient: ['#00fff2', '#0024b9'],
                                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      { offset: 0, color: '#00fff2' },
                                      { offset: 1, color: '#0024b9' }
                                  ])
                              },
                              yAxisIndex: 1,
                              data: creditNum,
                          },
                          {
                              name: '授信金额',
                              type: 'pictorialBar',
                              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                              symbolRepeat: true,
                              barWidth:40,
                              symbolSize: ['30%', '20%'],
                              itemStyle: {
                                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                      { offset: 0, color: '#a671ff' },
                                      { offset: 1, color: 'rgba(137,109,255,.1)' }
                                  ])
                              },
                              barGap: '10%',
                              lineStyle: {
                                  color: '#ffbc00',
                              },
                              data: numArr,
                          },
                      ]
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
#credit-board {
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

    #CreditChart {
        height: 80%;
        width: 98%;
    }
}
</style>