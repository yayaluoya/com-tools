<template>
  <div ref="ec"></div>
</template>

<script>
import echarts from 'echarts';
import { WindowSizeChangeE } from 'yayaluoya-tool/dist/web/event/WindowSizeChangeE';

export default {
  components: {},
  props: {
    op: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  watch: {
    op() {
      if (this.op) {
        this.init(this.op);
      } else {
        this.dispose();
      }
    },
  },
  mounted() {},
  deactivated() {
    this.dispose();
  },
  methods: {
    /** 销毁ec并移除所有相关的监听 */
    dispose() {
      WindowSizeChangeE.instance.off('resize', this);
      this.myChart?.dispose();
      this.resizeOvserver?.disconnect();
    },
    /** 创建 */
    init(option) {
      this.dispose();
      console.log('init EC', option);
      //
      this.myChart = echarts.init(this.$refs.ec);
      let time;
      let f = () => {
        clearTimeout(time);
        time = setTimeout(() => {
          this.myChart.resize();
        }, 0);
      };
      this.myChart.on('click', (e) => {
        this.$emit('click', e);
      });
      this.myChart.on('mousedown', (e) => {
        this.$emit('mousedown', e);
      });
      this.myChart.on('mousemove', (e) => {
        this.$emit('mousemove', e);
      });
      this.myChart.on('mouseup', (e) => {
        this.$emit('mouseup', e);
      });
      this.myChart.on('mouseover', (e) => {
        this.$emit('mouseover', e);
      });
      this.myChart.on('mouseout', (e) => {
        this.$emit('mouseout', e);
      });
      //监听
      if (typeof window.ResizeObserver != 'undefined') {
        let __f = () => {
          if (!this.$refs.ec || this.myChart.isDisposed()) {
            return;
          }
          this.myChart.off('finished', __f);
          this.resizeOvserver = new ResizeObserver(f);
          this.resizeOvserver.observe(this.$refs.ec);
        };
        this.myChart.on('finished', __f);
      } else {
        WindowSizeChangeE.instance.on('resize', this, f);
      }
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption({
        ...option,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
