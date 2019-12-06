<template>
  <div>
    <div class="genre">
      GENRE
      <div id="vis"></div>
    </div>
  </div>
</template>

<script>
import { bubbleChart, setupButtons } from '@/assets/js/charts';
const d3 = require('d3');

export default {
  created() {
    const myBubbleChart = bubbleChart();
    d3.csv(
      'https://raw.githubusercontent.com/vlandham/bubble_chart_v4/master/data/gates_money.csv'
    )
      .then(data => myBubbleChart('#vis', data))
      .catch(e => console.log('error while reading csv', e));

    setupButtons(myBubbleChart);
  }
};
</script>

<style lang="scss" scoped>
</style>
