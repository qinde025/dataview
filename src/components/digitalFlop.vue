<template>
    <div>
        <dv-border-box-12>
            <div id="digital-flop">
                <div
                        class="digital-flop-item"
                        v-for="item in digitalFlopData"
                        :key="item.title"
                >
                    <div class="digital-flop-title">{{ item.title }}</div>
                    <div class="digital-flop">
                        <dv-digital-flop
                                :config="item.number"
                                style="width:100px;height:45px;"
                        />
                        <div class="unit">{{ item.unit }}</div>
                    </div>
                    <div class="digital-flop">
                        今日新增：{{ item?.number?.today }}
                    </div>
                </div>

            </div>
        </dv-border-box-12>
    </div>
</template>

<script>
import { getCollect } from "@/apis/api"
import { moneyWanFormat, moneyFormat } from "@/utils/common"
export default {
  name: 'DigitalFlop',
  data () {
    return {
      digitalFlopData: []
    }
  },
  methods: {
      initChart () {
      // 1. 申请金额(万元) 2. 受理金额(万元) 3.受理笔数(笔) 4.注册企业(家) 5.金融机构(家) 6.金融产品(个) 7.放款笔数(笔) 8.授信笔数(笔)
      getCollect({}).then(res => {
        if (res?.status === "200") {
          let resData = res?.data;
          // console.log((resData?.applicationMoneySum / 10000), "shouli")
          this.digitalFlopData = [
            {
              title: '申请资金',
              number: {
                number: [(resData?.applicationMoneySum / 10000) || 0],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#f46827',
                  fontWeight: 'bold',
                  fontSize: 24
                },
                toFixed: 2,
                today: moneyFormat(resData?.applicationMoneyTodaySum)
              },
              unit: '万元'
            },
            {
              title: '申请笔数',
              number: {
                number: [resData?.reviewedCnt],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#40faee',
                  fontWeight: 'bold'
                },
                today: resData?.reviewedTodayCnt
              },
              unit: '笔'
            },
              {
                  title: '受理金额',
                  number: {
                      number: [Number(resData?.reviewedMoneySum / 10000) || 0],
                      content: '{nt}',
                      textAlign: 'center',
                      toFixed: 2,
                      style: {
                          fill: '#f46827',
                          fontWeight: 'bold',
                          fontSize: 24
                      },
                      today: moneyWanFormat(resData?.reviewedMoneyTodaySum)
                  },
                  unit: '万元'
              },
            {
              title: '授信笔数',
              number: {
                number: [resData?.creditCnt],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#40faee',
                  fontWeight: 'bold'
                },
                today: resData?.creditTodayCnt
              },
              unit: '笔'
            },
            {
              title: '放款笔数',
              number: {
                number: [resData?.loanCnt],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#4d99fc',
                  fontWeight: 'bold'
                },
                today: resData?.loanTodayCnt
              },
              unit: '笔'
            },

            {
              title: '注册企业',
              number: {
                number: [resData?.registUsers],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#40faee',
                  fontWeight: 'bold'
                },
                today: resData?.registToday
              },
              unit: '家'
            },
            {
              title: '贷款机构',
              number: {
                number: [resData?.bankCnt || 0],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#4d99fc',
                  fontWeight: 'bold'
                },
                today: resData?.bankCntToday
              },
              unit: '家'
            },
            {
              title: '小贷产品',
              number: {
                number: [resData?.financialProductCnt || 0],
                content: '{nt}',
                textAlign: 'center',
                style: {
                  fill: '#40faee',
                  fontWeight: 'bold'
                },
                today: resData?.financialProductTodayCnt
              },
              unit: '个'
            }
          ]
        }
      }).catch()
    },
      startInterval() {
          let This = this
          // 循环高亮
          var intervalId = setInterval(function () {
              This.initChart()
          }, 60000) // 每个区域之间的切换时间
      },
  },
  mounted () {
    this.initChart()
    this.startInterval()
  }
}
</script>

<style lang="scss">
#digital-flop {
  position: relative;
  height: 15vh;
  min-height: 80px;
  width: 101%;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .digital-flop-item {
    width: 13%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    //border-left: 1px solid #4d99fc;
    border-right: 1px solid #4d99fc;

  }


  .digital-flop-title {
    font-size: 16px;
  }

  .digital-flop {
    display: flex;
    font-size: 14px;
  }

  .unit {
    margin-left: 5px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
