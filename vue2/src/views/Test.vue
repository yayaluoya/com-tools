<template>
  <div class="test">
    <TEditor style="width: 50%; height: 400px" :content.sync="content" />
    <span>{{ content }}</span>
    <EC style="width: 50%; height: 400px" :op="ecOp" />
  </div>
</template>

<script>
import TEditor from '@/components/TEditor/index.vue';
import EC from '@/components/EC/index.vue';
import { Vector2 } from 'yayaluoya-tool/dist_esm/Vector2';

export default {
  components: { TEditor, EC },
  data() {
    return {
      content: '',
      ecOp: null,
    };
  },
  mounted() {
    console.log(new Vector2());
    this.ecOp = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
  },
};
</script>

<style></style>
