<template>
  <div :id="id" class="bubble-cloud"></div>
</template>

<script>
import bubbleChart from '@/mixins/bubbleChart.js';
import dimensionable from '@/mixins/dimensionable.js';

const d3 = require('d3');

export default {
  mixins: [dimensionable, bubbleChart],
  data () {
    return {
      calculated: [],
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
    },
    attr: {
      type: String,
      required: true
    }
  },
  watch: {
    calculated () {
      //first and soft calculation of forces to manage spacing (it will continue slightly adjusting though)
      if (this.calculated.length === this.category[1].length) {
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
      return this.attr + this.category[0].split(' ').join('-');
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
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", (d) => {
        this.calculated.push(d.y);
        return d.y;
      });
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
    setLabels () {
      const label = this.category[0].toLowerCase();
      const textWidth = this.textWidth(label);

      const xx = (this.width - textWidth) / 2;
      const yy = 0;

      this.label = d3
        .select(this.$el)
        .append('div')
        .attr('class', 'cloud-label')
        .style('position', 'absolute')
        .style('color', '#aa9d9c')
        .style('font-size', '14')
        .style('right', '30px')
        .style('bottom', 0)

      this.labelText = this.label
        .append('div')
        .attr('class', 'text')
        .style('position', 'relative')
        .text(label);

      if (d3.select(`#${this.attr} .bubble-cloud:first-child`).node() === this.$el) {
        this.labelText
          .append('img')
          .attr('src', '/handmade-circle.gif')
          .attr('width', textWidth + 20)
          .attr('height', 34)
          .style('position', 'absolute')
          .style('right', '-10px')
          .style('top', '-5px')
      }
    },
    adjustLabels () {
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/common.scss';

.bubble-cloud {
  min-height: 150px;
  max-width: 80vw;
  height: 100%;
  margin: auto;
  position: relative;

  @include media-breakpoint-down(l) {
    width: 100%;
  }
}
</style>
