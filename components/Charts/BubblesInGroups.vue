<template>
  <div ref="chartContainer" class="chart-container">
    <!-- <div class="test"></div> -->
    <!-- <svg ref="chart" :height="height" :width="width" /> -->
  </div>
</template>

<script>
const d3 = require('d3');
export default {
  name: 'bubbles-in-groups',
  props: {
    groups: Object,
    movies: Array,
    attr: String
  },
  data () {
    return {
      height: null,
      width: null,
      display: 'large' //[small (<1024), medium (<1500), large]
    }
  },
  beforeMount () {
    this.display = this.calculateDisplay();
    const sortByQty = Object.entries(this.groups).sort((a, b) => b[1].length - a[1].length);
    this.data = this.movies.map(m => {
      const primary = m[this.attr].find(a => a.primary);
      m.primary = primary;
      m.primaryPos = sortByQty.findIndex(s => s[0] === primary['genre_name']) + 1;
      return m;
    })
    const max = Math.max.apply(Math, this.data.map(d => d.revenue));
    this.scale = d3.scaleLinear()
      .domain([0, max])
      .range([10, 50]);
  },
  mounted () {
    let doit;
    window.addEventListener('resize', () => {
      clearTimeout(doit);
      doit = setTimeout(this.resized, 300);
    });
    this.draw();
  },
  beforeDestroy () {
    console.log('about to destroy');
    window.removeEventListener('resize');
  },
  methods: {
    setDimensions () {
      const container = this.$refs.chartContainer.getBoundingClientRect();
      this.width = container.width;
      this.height = container.height
      console.log('DIMENSIONS', this.width, this.height);
    },
    resized () {
      this.setDimensions();
      const newDisplay = this.calculateDisplay();
      console.log('resided function!!', newDisplay, this.display);
      if (newDisplay !== this.display) {
        this.display = newDisplay;
        this.draw();
      }
    },
    calculateDisplay () {
      const width = document.documentElement.clientWidth;
      if (width < 1024) {
        return 'small'
      } else if (width < 1500) {
        return 'medium'
      }

      return 'large';
    },
    title (d) {
      return d.title.split(' ').join('-')
    },
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", d => d.y);
    },
    draw () {
      console.log('DRAWING', this.display);
      this.setDimensions();
      d3.select("svg").remove();
      switch (this.display) {
        case 'small': {
          this.drawSmallLayout(); break;
        } default: this.drawLargeLayout();
      }
    },
    drawSmallLayout () {
      console.log('drawSmallLayout');
    },
    drawLargeLayout () {
      console.log('drawMediumLayout');
      const xScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([0, 55, 85, 0, 55, 85])//percentages
      const yScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([0, 0, 0, 50, 50, 50])//percentages

      const forceX = (d) => {
        const container = this.$refs.chartContainer.getBoundingClientRect();
        const percentage = xScale(d.primaryPos <= 6 ? d.primaryPos : 6);

        const xPerPercentage = percentage * container.width / 100;
        if (percentage < 20) {
          console.log('percentage is < 20', Math.max(170, xPerPercentage));
          return Math.max(170, xPerPercentage)
        }
        if (percentage > 50) {
          console.log('percentage is > 50', Math.min(container.width - 200, xPerPercentage));
          return Math.min(container.width - 100, xPerPercentage)
        }
        return percentage * container.width / 100;
      }
      const forceY = (d) => {
        const percentage = yScale(d.primaryPos <= 6 ? d.primaryPos : 6);
        const container = this.$refs.chartContainer.getBoundingClientRect();
        if (percentage === 0) {
          return 180;
        } else {
          console.log('CONTAINER HEIGHT', 70 * container.height / 100, Math.min(600, container.height - 300));
          return Math.min(700, 75 * container.height / 100)//container.height - 300);
        }
      }
      // the simulation is a collection of forces 
      // about where we want our circles to go
      // and how we want out circles to interact
      // STEP 1: get them to the middle
      // STEP 2: don't have them collide!
      const simulation = d3
        .forceSimulation(this.data)
        .force('x', d3.forceX(forceX).strength(0.1))
        .force('y', d3.forceY(forceY).strength(0.1))
        .force("collide", d3.forceCollide(d => this.scale(d.revenue) + 2))
        .on('tick', this.ticked);

      this.svg = d3.select('.chart-container').append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .attr("class", "nodes")

      const defs = this.svg.append('defs');

      defs.selectAll(".poster-pattern")
        .data(this.data)
        .enter()
        .append("pattern")
        .attr("class", ".poster-pattern")
        .attr('id', this.title)
        .attr('height', '100%')
        .attr('width', '100%')
        .attr('patternContentUnits', 'objectBoundingBox')
        .append('image')
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", d => d.poster.url)

      this.nodes = this.svg
        .selectAll("circle")
        .data(this.data)
        .enter().append("circle")
        .attr("r", d => this.scale(d.revenue))
        .attr("fill", d => `url(#${this.title(d)})`)
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';

.test {
  height: 150px;
  background: blue;
  width: 599px;
  position: absolute;
}
.page-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  // grid-template-rows: repeat(6, 1fr);

  @include media-breakpoint-up(md) {
    grid-template-columns: 16% 84%;
  }
}
svg {
  @include media-breakpoint-up(lg) {
    max-height: 83vh;
  }
}
</style>