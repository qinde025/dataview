<template>
  <div class="clock-container">
    {{formattedTime}}
  </div>
</template>
<script>
export default {
  name: "real-clock",
  data () {
    return {
      time: new Date(),
      timer: null
    }
  },
  computed: {
    formattedTime () {
      return this.time.toLocaleString();
    }
  },
  created () {
    this.timer = setInterval(this.updateTime, 1000);
  },
  mounted () {
    console.log(new Date(), "timestamp")
  },
  methods: {
    updateTime () {
      this.time = new Date();
    }

  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
}
</script>
<style>
.clock-container {
  text-align: left;
  font-size: 16px;
  line-height: 2;
  padding: 6px 0 0 20px;
  color: #43D0D6;
}
</style>