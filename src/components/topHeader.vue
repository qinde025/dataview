<template>
  <div id="top-header">
    <real-clock class="header-left-decoration" />
    <div class="center-title">{{sysInfo.systemName}}</div>

    <div class="left-title">{{sysInfo.institution}}</div>
  </div>
</template>

<script>
import RealClock from "./clock.vue"
import {getSysInfo} from "@/apis/api";
export default {
  name: 'TopHeader',
  components: {
    RealClock
  },
    data(){
      return {
          sysInfo:{systemName:"某某普惠贷款大屏",institution:"某某金融科技有限公司"}
      }
    },
    methods:{
      init(){
          // getSysInfo({}).then(res => {
          //     if (res?.status === "200") {
          //         this.sysInfo =  res?.data
          //         if(!this.sysInfo.systemName) {
          //             this.sysInfo.systemName = "大屏管理平台"
          //         }
          //         if(!this.sysInfo.institution) {
          //             this.sysInfo.institution = "酷屏有限公司"
          //         }
          //     }
          // })
      }
    },
    mounted() {
      this.init()
    }
}
</script>

<style lang="scss">
#top-header {
  position: relative;
  width: 100%;
  height: 9vh;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  background: url("@/assets/head.png") 0 0/100% 95% no-repeat;

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 60px;
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    color: #43D0D6;
  }

  .left-title {
    font-size: 1rem;
    color: #58f2ff;
    opacity: 0.65;
    display: block;
    width: 12.5rem;
    padding: 6px 0 0 20px;
  }

  .visit {
    text-align: right;
  }
}
</style>
