<template>
  <div id="ranking-board">
    <div class="ranking-board-title">贷款申请量-近7日</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import {getLoanView, rankProds} from "@/apis/api"
import { formatDateSpecial, moneyWanFormat } from "@/utils/common"
let flexHeight = 300;
export default {
  name: 'RankingBoard',
  data () {
    return {
      option: {}
    }
  },
  mounted () {
    this.initChart()
    this.startInterval()
  },
  methods: {
      initChart(){
          getLoanView({}).then(res => {
              if (res?.status === '200') {
                  let resource = res.data
                  if(resource && resource.length>7) {
                      resource  =  resource.slice(resource.length-7,resource.length)
                  }
                  let days = resource.map((item) => {
                      return formatDateSpecial(item.days)
                  });
                  let applicant_counts = resource.map((item) => {
                      return item.applicant_count
                  });
                  let financing_sum_amounts = resource.map((item) => {
                      return Number(moneyWanFormat(item.financing_sum_amount))
                  });
                  let maxVal1 = Math.max(...applicant_counts)

                  let maxVal2 = Math.max(...financing_sum_amounts)

                  // console.log(days, applicant_counts, financing_sum_amounts)

                  this.option = {
                      legend: {
                          left: flexHeight > 600 ? 40 : '10',
                          top: 20,
                          itemWidth: flexHeight > 600 ? 30 : 15,
                          itemHeight: flexHeight > 600 ? 20 : 10,
                          textStyle: {
                              fill: "rgba(88,242,255,0.65)",
                          },
                          // itemGap: 15,
                          borderRadius: 4,
                          data: [{ name: '申请笔数' }, { name: '申请金额' }],
                          style: {
                              color: "#fff"
                          }
                      },
                      xAxis: {
                          data: days,
                          axisLine: {
                              show: true,
                              color: "#59baf2",
                          },
                          axisTick: {
                              show: true,
                              color: "#fff"
                          },
                          axisLabel: {
                              show: true,
                              style: {
                                  fill: 'rgb(255,255,255)',
                                  rotate: 20,
                              }
                          }

                      },
                      yAxis: [
                          {
                              // position: "right",
                              data: 'value',
                              name: '申请笔数',
                              nameTextStyle: {
                                  fill: '#59baf2',
                              },
                              // min: 10,
                              max: maxVal1,
                              // interval: 20,
                              splitLine: {
                                  show: false
                              },
                              axisTick: {
                                  show: true,
                              },
                              axisLine: {
                                  show: true,
                              },
                              axisLabel: {
                                  show: true,
                                  style: {
                                      fill: '#59baf2',
                                  },
                              }

                          },
                          {
                              position: "right",
                              data: 'value',
                              nameTextStyle: {
                                  fill: "#59baf2"
                              },
                              name: '申请金额',
                              // min: 0,
                              max: maxVal2,
                              // interval: 10,
                              style: {
                                  fill: "#fff",
                              },
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
                                  style: {
                                      fill: '#59baf2',
                                      // fontSize: flexHeight > 600 ? 20 : 12,
                                  },
                              }

                          }
                      ],
                      series: [
                          {
                              name: '申请笔数',
                              type: 'line',
                              yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                              smooth: true,
                              areaStyle: {
                                  normal: {
                                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [

                                          {
                                              color: "rgba(57,216,255,.65)",
                                              offset: 0
                                          }, {
                                              color: "rgba(57,216,255,0.2)",
                                              offset: 1
                                          }
                                      ])
                                  }
                              },
                              itemStyle: {
                                  //折线拐点标志的样式
                                  color: 'aqua',
                                  borderWidth: '1',
                              },
                              lineArea: {
                                  show: true,
                                  gradient: ["rgba(57,216,255,.65)", "rgba(57,216,255,0.2)"]
                              },
                              lineStyle: {
                                  stroke: 'rgb(166,113,255)',
                              },
                              data: applicant_counts
                          },
                          {
                              name: '申请金额',
                              type: 'line',
                              smooth: true,
                              areaStyle: {
                                  normal: {
                                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                          {
                                              color: "rgba(166,113,255,.65)",
                                              offset: 0
                                          }, {
                                              color: "rgba(166,113,255,0)",
                                              offset: 1
                                          }
                                      ])
                                  }
                              },
                              symbol: 'circle', //标记的图形为实心圆
                              symbolSize: 8, //标记的大小
                              itemStyle: {
                                  //折线拐点标志的样式
                                  color: '#d4237a',
                                  borderWidth: '1',
                              },
                              lineArea: {
                                  show: true,
                                  gradient: ["rgba(166,113,255,.65)", "rgba(166,113,255,0)"]
                              },
                              lineStyle: {
                                  stroke: 'rgb(166,113,255)',
                              },
                              data: financing_sum_amounts,
                              yAxisIndex: 1
                          }
                      ]
                  }

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
    randomExtend (minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    }
  }
}
</script>

<style lang="scss">
#ranking-board {
  height: 95%;
  display: flex;
  flex-direction: column;

  .ranking-board-title {
    height: 30px;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    padding: 15px 10px 0  10px;
    color: #43D0D6;
  }

  .dv-scroll-ranking-board {
    flex: 1;
  }
}
</style>
