<template>
  <div id="scroll-board">
    <dv-scroll-board
      :config="config"
      ref="scrollBoard"
    />
  </div>
</template>

<script>
import { currentLoanList } from "@/apis/api"
export default {
  name: 'ScrollBoard',
  data () {
    return {
      list: [],
      config: {
        header: ['申请时间',  '金融机构',  "申请金额", '企业',],
        data: [],
        index: true,
        columnWidth: [38, 100, 100, 100],
        align: ['center'],
        headerBGC: '#1981f6',
        headerHeight: 45,
        oddRowBGC: 'rgba(0, 44, 81, 0.8)',
        evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  methods: {
    getList () {
      currentLoanList().then(res => {
        let newArr = []
        if (res?.status === "200") {
          res?.data?.map(item => {
            let arr = [item.application_time.substring(0,10),
                item.bank_name, (item.financing_amount / 10000).toFixed(2)+"万元",item.enterprise_name,]
            newArr.push(arr)
          })
          this.config.data = newArr
          this.$refs['scrollBoard'].updateRows(newArr, 0)
        }
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss">
#scroll-board {
  margin: 5px;
  height: 97%;
  overflow: hidden;
}
.dv-scroll-board .header{
  background-color: rgba(49, 95, 164, 0.85) !important;
}
</style>
