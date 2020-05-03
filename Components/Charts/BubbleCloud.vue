<template>
  <div :id="id" :style="divDimensions" class="bubble-cloud"></div>
</template>

<script>
import bubbleChart from '@/mixins/bubbleChart.js';
import dimensionable from '@/mixins/dimensionable.js';

const d3 = require('d3');

export default {
  mixins: [dimensionable, bubbleChart],
  data () {
    return {
      doit: false,
      calculated: [],
      divDimensions: {}
    }
  },
  props: {
    category: {
      type: Array,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    ranking: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 50
    },
    maxRadius: {
      type: Number,
      default: 50
    }
  },
  watch: {
    calculated () {
      if (this.calculated.length === this.category[1].length) {
        this.setHeight();
        this.$emit('done', this.ranking)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setDimensions();
      this.draw();
    });
  },
  computed: {
    id () {
      return this.category[0].split(' ').join('-');
    },
    selector () {
      return `#${this.id}`;
    },
    xForce () {
      return this.width / 2;
    },
    yForce () {
      return this.height / 2;
    }
  },
  methods: {
    setHeight () {
      const min = Math.min(...this.calculated);
      const max = Math.max(...this.calculated);
      const padding = 50;

      const divHeight = max + (min > 0 ? (-1 * min) : Math.abs(min)) + this.maxRadius + padding;
      this.divDimensions = { height: divHeight + 'px' };
    },
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", (d) => {
        this.calculated.push(d.y);
        return d.y;
      });
      this.setHeight();
    },
    draw () {
      const data = this.category[1];

      const props = {
        data,
        xForce: this.xForce,
        yForce: this.yForce,
        onTickFn: this.ticked,
        onEndFn: this.onEndSimulation
      };
      this.createSimulation('category', props);
      this.appendSvg();
      this.appendDefinitions(data);
      this.appendCircles(data);
    },
    onEndSimulation () {
      this.setHeight();
      // this.setLabels
    }
  },
};
</script>

<style lang="scss" scoped>
.bubble-cloud {
  min-height: 150px;
  max-width: 80vw;
  height: 100%;
  margin: auto;
  position: relative;
}
</style>
