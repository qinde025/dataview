<template>
    <div id="product-board">
        <div class="board-title">融资按产品统计</div>
        <dv-scroll-board
            :config="config"
            ref="scrollBoard"
        />
    </div>
</template>
<script>
import {rankProds} from "@/apis/api"
export default {
    name: 'ProductScroll',
    data () {
        return {
            list: [],
            config: {
                header: ['产品名称',  '申请数量',  "申请金额",],
                data: [],
                index: true,
                columnWidth: [45, 150, 80, ],
                align: ['center'],
                headerBGC: '#1981f6',
                headerHeight: 45,
                oddRowBGC: 'rgba(0, 44, 81, 0.8)',
                evenRowBGC: 'rgba(10, 29, 50, 0.8)'
            }
        }
    },
    methods: {
        initChart () {
            rankProds({limit:10}).then(res => {
                let newArr = []
                if (res?.status === "200") {
                    let resource = res.data.reverse()
                    resource.map(item => {
                        let arr = [item.name, item.value, (item.amount / 10000).toFixed(2)+" 万元",]
                        newArr.push(arr)

                    })
                    this.config.data = newArr.reverse()
                    this.$refs['scrollBoard'].updateRows(newArr, 0)
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
    created () {
        this.initChart()
        this.startInterval()
    }
}
</script>

<style lang="scss">
#product-board {
    margin: 5px;
    height: 95%;
    overflow: hidden;
}
.dv-scroll-board .header{
    background-color: rgba(49, 95, 164, 0.85) !important;
}
</style>
