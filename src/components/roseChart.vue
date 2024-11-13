<template>
  <div id="rose-chart">
    <div class="rose-chart-title">贷款按行业统计</div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
import { loanListByIndus } from "@/apis/api"
export default {
  name: 'RoseChart',
  data () {
    return {
      option: {}
    }
  },
  methods: {
      initChart () {
      loanListByIndus({}).then(res => {
        if (res?.status === '200') {
          let i = 0
            let resource = res.data.reverse()
          let y_data_name = resource.map((item) => {
            if (item?.name) {
              return item?.name?.length > 5
                ? item?.name.slice(0, 5) +
                "..."
                : item?.name;
            } else {
              return "不区分"
            }
          });
          let numArrs0 = resource.map((item) => {
            return item.value
          });
          let maxVal1 = Math.max(...numArrs0);
          let numArrs1 = resource.map((item) => {
            return Number((item.amount / 10000))
          });
          let maxVal2 = Math.max(...numArrs1);
          let data2 = resource.map((item) => {
            return item.value;
          });
          let data1 = resource.map((item) => {
            return item.amount
          });
          // console.log(data1, data2, "sdsd")
          this.option = {
            grid: {
              top: 10,
              left: 80,
              right: 20,
              bottom: 20,
              containLabel: false,
              // 整个图的外边框
              show: false
            },
            toolbox: {
              show: true
            },
            tooltip: {
              formatter: (val) => {
                return val
              }
            },
            xAxis: [
              {
                name: '笔数',
                data: 'value',
                max: maxVal1,
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                }
              },
              {
                name: '金额',
                data: 'value',
                max: maxVal2,
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                }
              }
            ],
            yAxis: {
              name: '',
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                inside: false,
                // label 文字颜色
                style: {
                  fill: "#59baf2",
                }
              },
              data: y_data_name
            },
            series: [
              {
                data: data2,
                type: 'bar',
                animationCurve: 'easeOutBack',
                label: {
                  show: true,
                  position: 'center',
                  offset: [0, 0],
                  style: {
                    fill: '#fff'
                  },
                  formatter: (val) => {
                    return val.value + "笔"
                  }
                },
                gradient: {
                  color: ["#39d8ff", "rgba(57,216,255,.1)"]
                },
                xAxisIndex: 0,

              },
              {
                data: numArrs1,
                type: 'bar',
                barWidth:15,
                animationCurve: 'easeOutBack',
                label: {
                  show: true,
                  position: 'center',
                  offset: [0, 0],
                  style: {
                    fill: '#fff'
                  },
                  formatter: (val) => {
                    return val.value + "万元"
                  }
                },
                gradient: {
                  color: ["#a672ff", "rgba(166,114,255,.1)"]
                },
                xAxisIndex: 1
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
          }, 60000)
      },
  },
  mounted () {
    this.initChart()
      this.startInterval()
  }
}
</script>

<style lang="scss">
#rose-chart {
  height: 90%;
  margin: 5px;
  box-sizing: border-box;

  .rose-chart-title {
    height: 30px;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    padding: 15px 10px 0  10px;
    color: #43D0D6;
  }

  .dv-charts-container {
    height: calc(100% - 50px);
  }
}
</style>
