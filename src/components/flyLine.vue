<template>
    <div class="fy-contain">
      <div id="flyline"></div>
      <div class="data-box">
          <div>所属地区：{{curData.name}}</div>
          <div>申请企业：<span style="color: coral">{{curData.value}} </span> 家</div>
          <div>贷款金额：<span style="color: coral">{{(curData.amount/10000).toFixed(2)}}</span> 万元 </div>
      </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/lib/echarts';
import {GeoComponent} from 'echarts/components';
import {EffectScatterChart} from 'echarts/charts';
import {LinesChart} from 'echarts/charts';
import { MapChart } from 'echarts/charts';
import {getLoanByArea} from "@/apis/api";
echarts.use([MapChart]);
echarts.use([EffectScatterChart]);
echarts.use([GeoComponent]);
echarts.use([LinesChart]);
// 定义高亮区域数组
let intervalId = null
let currentIndex = 0
// 动态高亮
export default {
    name: "FlyLineChart",
    data() {
        return {
            option: {},
            myChart: null,
            areaList:{
                "china":{"code":"china",file:"100000_full.json", name:"全国"},
                "bj":{"code":"bj",file:"110000_full.json", name:"北京市"},
                "tj":{"code":"tj",file:"120000_full.json", name:"天津市"},
                "hbs":{"code":"hbs",file:"130000_full.json", name:"河北省"},
                "sxs":{"code":"sxs",file:"140000_full.json", name:"山西省"},
                "nmg":{"code":"nmg",file:"150000_full.json", name:"内蒙古自治区"},
                "lns":{"code":"lns",file:"210000_full.json", name:"辽宁省"},
                "jls":{"code":"jls",file:"220000_full.json", name:"吉林省"},
                "hljs":{"code":"hljs",file:"230000_full.json", name:"黑龙江省"},
                "sh":{"code":"sh",file:"310000_full.json", name:"上海市"},
                "jss":{"code":"jss",file:"320000_full.json", name:"江苏省"},
                "zjs":{"code":"zjs",file:"330000_full.json", name:"浙江省"},
                "ahs":{"code":"ahs",file:"340000_full.json", name:"安徽省"},
                "fjs":{"code":"fjs",file:"350000_full.json", name:"福建省"},
                "jxs":{"code":"jxs",file:"360000_full.json", name:"江西省"},
                "sds":{"code":"sds",file:"370000_full.json", name:"山东省"},
                "hns":{"code":"hns",file:"410000_full.json", name:"河南省"},
                "hb":{"code":"hb",file:"420000_full.json", name:"湖北省"},
                "hn":{"code":"hn",file:"430000_full.json", name:"湖南省"},
                "gds":{"code":"gds",file:"440000_full.json", name:"广东省"},
                "gx":{"code":"gx",file:"450000_full.json", name:"广西壮族自治区"},
                "hls":{"code":"hls",file:"460000_full.json", name:"海南省"},
                "cqs":{"code":"cqs",file:"500000_full.json", name:"重庆市"},
                "scs":{"code":"scs",file:"510000_full.json", name:"四川省"},
                "gzs":{"code":"gzs",file:"520000_full.json", name:"贵州省"},
                "yns":{"code":"yns",file:"530000_full.json", name:"云南省"},
                "xz":{"code":"xz",file:"540000_full.json", name:"西藏自治区"},
                "sx":{"code":"yns",file:"610000_full.json", name:"陕西省"},
                "gss":{"code":"yns",file:"620000_full.json", name:"甘肃省"},
                "qhs":{"code":"yns",file:"630000_full.json", name:"青海省"},
                "nx":{"code":"yns",file:"640000_full.json", name:"宁夏回族自治区"},
                "xj":{"code":"yns",file:"650000_full.json", name:"新疆维吾尔自治区"},
                "tw":{"code":"yns",file:"710000_full.json", name:"台湾省"},
                "hongkong":{"code":"hongkong",file:"810000_full.json", name:"香港特别行政区"},
                "aomen":{"code":"aomen",file:"910000_full.json", name:"澳门特别行政区"},

            },
            regions:[],
            curData:{name:"",amount:0, value:0}
        }
    },
    props:['area'],
    mounted() {
        this.initChart()
        this.startInterval()
    },
    methods:{
        initChart(){
            console.log("map area is " +this.area)
            let info = this.areaList[this.area]
            const xhr = new XMLHttpRequest();
            // xhr.open('get', "https://geo.datav.aliyun.com/areas/bound/"+info.file, true)
            xhr.open('get', "./"+info.file, true)
            xhr.send(null)
            xhr.onreadystatechange = () => {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    const data = JSON.parse(xhr.responseText);
                    this.myChart = echarts.init(document.getElementById('flyline'));
                    const coord = data.features.map(val => {
                        return {
                            name: val.properties.name,
                            value: val.properties.center
                        }
                    })
                    this.regions = data.features.map(item => {
                        return item.properties.name
                    })
                    const lines_coord = [];
                    coord.forEach((v, index) => {
                        index > 0 &&v.value!=null&& lines_coord.push({
                            coords: [v.value, coord[0].value]
                        })
                    })
                    //地市取简称
                    data.features.forEach(v => {
                        // v.properties.name = v.properties.name.indexOf('版纳') > -1 ? v.properties.name.substr(0, 4) : v.properties.name.substr(0, 2);
                    })
                    echarts.registerMap(info.code, data);
                    this.option = {
                        title: {
                            text: info.name+'融资分布',
                            textStyle: { fontSize: 18, fontWeight: "bolder", color: "#43D0D6", },
                            padding:10,
                            x:"center"
                        },
                        tooltip: {
                            trigger: 'item',
                            position: 'bottom',
                            formatter:`{b}`,
                            backgroundColor: 'rgba(50, 50, 50, 0.7)',
                            textStyle: {
                                color: '#FFFFFF',
                                textalign: 'center',
                                fontSize: '12px'
                            },
                            data:{}

                        },
                        geo: {
                            map: info.code,
                            zlevel: 10,
                            show: true,
                            layoutCenter: ['50%', '50%'],
                            roam: true,
                            layoutSize: "90%",
                            zoom: 1,
                            label: {
                                show: true,
                                fontSize: 12,
                                color: '#43D0D6'
                            },
                            itemStyle: {
                                color: '#062031',
                                borderWidth: 1.1,
                                borderColor: '#43D0D6'
                            },
                            emphasis: {
                                itemStyle: {
                                    areaColor: '#ffff99',
                                    borderColor: '#f29100'
                                },
                                label: {
                                    fontSize: 16,
                                    color: '#f29100'
                                }
                            }
                        },
                        series: [
                            {
                                type: 'map',
                                map: info.code,
                                geoIndex: 0,
                                roam: false,
                                data: coord
                            },
                            {
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                zlevel: 15,
                                symbolSize: 8,
                                rippleEffect: {
                                    period: 4, brushType: 'stroke', scale: 4
                                },
                                itemStyle: {
                                    color: '#2ba5f3',
                                    opacity: 1
                                },
                                data: coord.slice(1)
                            },
                            {
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                zlevel: 15,
                                symbolSize: 12,
                                rippleEffect: {
                                    period: 6, brushType: 'stroke', scale: 8
                                },
                                itemStyle: {
                                    color: '#FF5722',
                                    opacity: 1
                                },
                                data: coord.slice(0, 1)
                            },
                            {
                                type: 'lines',
                                coordinateSystem: 'geo',
                                zlevel: 15,

                                effect: {
                                    show: true, period: 5, trailLength: 0, symbol: 'arrow', color: '#01AAED', symbolSize: 8,
                                },
                                lineStyle: {
                                    width: 1.2, opacity: 0.6, curveness: 0.2, color: '#FFB800'
                                },
                                data: lines_coord
                            }

                        ]
                    }
                    this.myChart.setOption(this.option);
                    // 鼠标划入
                    this.myChart.on('mouseover', (event) => {
                        // 停止定时器
                        // clearInterval(intervalId)
                        // intervalId = null
                        // 清除之前的高亮
                        this.cancelHighlightRegion(currentIndex-1)
                        // console.log("mouseover",event.name)
                        this.getLoan(event.name)
                    })
                    // 鼠标划出重新开始定时器
                    // this.myChart.on('mouseout', (event) => {
                    //     clearInterval(intervalId)
                    //     this.startInterval()
                    //     console.log("mouseout",event.name)
                    // })
                }
            }
        },
        async highlightRegion(index) {
            console.log(index, this.regions[index])
            // 高亮当前区域
            this.myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex:index,
                name: this.regions[index]
            })
            this.getLoan(this.regions[index])
            // 显示 tooltip todo 有问题
            // this.myChart.dispatchAction({
            //     type: 'showTip',
            //     seriesIndex: 0,
            //     dataIndex:index,
            //     name: this.regions[index],
            //     data: info.data,
            // })

        },
        async getLoan(area) {
            var info = await getLoanByArea({"area":area});
            this.curData = info.data
            this.curData.name = area
        },
        // 取消高亮显示
        cancelHighlightRegion(index) {
            // 取消高亮区域
            this.myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex:index,
                name: this.regions[index]
            })
            // 取消显示 tooltip todo 有问题
            // this.myChart.dispatchAction({
            //     type: 'hideTip'
            // })
        },

        // 开始轮播显示
        startInterval() {
            let This = this
            // 循环高亮
            intervalId = setInterval(function () {
                // 取消上一个区域高亮
                if (currentIndex > 0) {
                    This.cancelHighlightRegion(currentIndex - 1)
                }
                if (currentIndex >= This.regions.length) {
                    currentIndex=0
                }
                // 高亮当前区域
                This.highlightRegion(currentIndex++)
            }, 10000) // 每个区域之间的切换时间
        },

    }
}
</script>
<style>
.fy-contain {
    width: 100%;
    height: 100%;
}
#flyline {
    width: 100%;
    height: 100%;
}
.data-box {
    position: absolute;
    top: 3px;
    right: 3px;
    z-index: 100;
    border: 1px dashed #999;
    min-height: 85px;
    padding: 6px 0 0 6px;
    min-width: 140px;
    border-right: none;
    border-top: none;
    border-radius: 3px;
    font-size: 14px;
    color: #43D0D6;
    line-height: 1.5;
    div {
        margin: 4px 0;
    }
}
</style>