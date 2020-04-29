<template>
  <div v-if="this.display==='small'" ref="chartContainer" class="small-chart-container">
    <BubbleCloud v-for="group in orderedGroups" :key="group[0]" :data="group" :max="maxRevenue" />
  </div>
  <div v-else ref="chartContainer" class="chart-container"></div>
</template>

<script>
import BubbleCloud from '@/components/Charts/BubbleCloud.vue';
const d3 = require('d3');

export default {
  name: 'bubbles-in-groups',
  components: { BubbleCloud },
  props: {
    groups: Object,
    movies: Array,
    attr: String,
    name: String
  },
  data () {
    return {
      maxRevenue: 0,
      data: [],
      height: null,
      width: null,
      display: 'large', //[small (<1024), large]
      doit: null,
      maxCYs: [0, 0],
      sortByQty: [],
      orderedGroups: [],
      coordinates: {
        columns: [0, 0, 0],
        rows: [0, 0],
        revenues: [0, 0] //revenues of the referenced circles (maxY)
      }
    }
  },
  beforeMount () {
    this.display = this.calculateDisplay();
    this.sortByQty = Object.entries(this.groups).sort((a, b) => b[1].length - a[1].length);
    this.data = this.movies.map(m => {
      const primary = m[this.attr].find(a => a.primary);
      m.primary = primary;
      m.primaryPos = this.sortByQty.findIndex(s => s[0] === primary[this.name]) + 1;
      return m;
    })
    this.maxRevenue = Math.max.apply(Math, this.data.map(d => d.revenue));
    this.scale = d3.scaleLinear()
      .domain([0, this.maxRevenue])
      .range([10, 50]);
  
    //small charts
    const others = this.sortByQty.slice(5, this.sortByQty.length).map(a => a[1]).flat();
    this.orderedGroups = [...this.sortByQty.slice(0, 5)]
    this.orderedGroups.push(['Others', others]);
  },
  mounted () {
    window.addEventListener('resize', this.eventListenerFn);
    this.draw();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resized);
  },
  methods: {
    eventListenerFn () {
      clearTimeout(this.doit);
      this.doit = setTimeout(this.resized, 300);
    },
    setDimensions () {
      const fn = () => {
        if (this.$refs.chartContainer) {
          const container = this.$refs.chartContainer.getBoundingClientRect();
          this.width = container.width;
          this.height = container.height
        }
      }

      this.$nextTick(() => {
        fn();
      });
    },
    resized () {
      this.setDimensions();
      const newDisplay = this.calculateDisplay();
      console.log('resided function!!', newDisplay, this.display);
      if (newDisplay !== this.display) {
        this.display = newDisplay;
        this.$nextTick(() => {
          this.draw();
        });
      }
    },
    calculateDisplay () {
      const width = document.documentElement.clientWidth;
      if (width < 1024) {
        return 'small'
      }

      return 'large';
    },
    title (d) {
      return d.title.split(' ').join('-')
    },
    ticked () {
      this.nodes.attr("cx", d => d.x);
      this.nodes.attr("cy", (d) => {
        if (d.primaryPos < 4 && d.y > this.coordinates.rows[0]) {
          this.coordinates.rows[0] = d.y;
          this.coordinates.revenues[0] = d.revenue;
        } else if (d.primaryPos > 3 && d.y > this.coordinates.rows[1]) {
          this.coordinates.rows[1] = d.y;
          this.coordinates.revenues[1] = d.revenue;
        }
        return d.y;
      });
    },
    draw () {
      console.log('DRAWING', this.display);
      this.setDimensions();
      if (this.display === 'small') {
        // this.drawSmallLayout();
      } else {
        d3.select("svg").remove();
        this.drawLargeLayout();
      }
    },
    // drawSmallLayout () {
    //   console.log('drawSmallLayout');
    //   const others = this.sortByQty.slice(5, this.sortByQty.length).map(a => a[1]).flat();
    //   let orderedGroups = [...this.sortByQty.slice(0, 5)]
    //   orderedGroups.push(['Others', others]);

    //   orderedGroups.forEach((group, index) => {
    //     this.drawBubbleGroup(group, `div:nth-child(${index + 1})`)
    //   });
    // },
    drawBubbleGroup (data, selector) {
      const groupSelector = `.small-chart-container>${selector}`;
      const container = d3.select(groupSelector).node().getBoundingClientRect();

      console.log('Drawing', data);
      d3.select(groupSelector)
        .text(data[0]);

      // const xScale = d3.scaleOrdinal()
      //   .domain([1, 2, 3, 4, 5, 6])
      //   .range([5, 55, 85, 5, 55, 85])//percentages
      // const yScale = d3.scaleOrdinal()
      //   .domain([1, 2, 3, 4, 5, 6])
      //   .range([0, 0, 0, 50, 50, 50])//percentages

      const forceX = (d) => {
        // const container = d3.select(groupSelector).node().getBoundingClientRect();
        return container.width / 2;
      }
      const forceY = (d) => {
        // const container = d3.select(groupSelector).node().getBoundingClientRect();
        return container.height / 2;
      }
      const simulation = d3
        .forceSimulation(data[1])
        .force('x', d3.forceX(forceX).strength(0.1))
        .force('y', d3.forceY(forceY).strength(0.1))
        .force("collide", d3.forceCollide(d => this.scale(d.revenue) + 2))
        .on('tick', smallTick)
      // .on('end', this.setLabels);

      this.svg = d3.select(groupSelector).append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox', '0 0 ' + container.width + ' ' + container.height)
        .attr('preserveAspectRatio', 'xMinYMid meet')
        .attr("class", "nodes")
      
        //TODO defs should be defined as computed property! or method
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

      this.smallNodes = this.svg
        .selectAll("circle")
        .data(data[1])
        .enter().append("circle")
        .attr('class', (d) => `movie-${d.id}`)
        .attr("r", d => this.scale(d.revenue))
        .attr("fill", d => `url(#${this.title(d)})`)

      const smallTick = () => {
        this.smallNodes.attr("cx", d => {
          return d.x
        });
        this.smallNodes.attr("cy", (d) => {
          // if (d.primaryPos < 4 && d.y > this.coordinates.rows[0]) {
          //   this.coordinates.rows[0] = d.y;
          //   this.coordinates.revenues[0] = d.revenue;
          // } else if (d.primaryPos > 3 && d.y > this.coordinates.rows[1]) {
          //   this.coordinates.rows[1] = d.y;
          //   this.coordinates.revenues[1] = d.revenue;
          // }
          return d.y;
        });
      }
    },
    drawLargeLayout () {
      console.log('drawLargeLayout');
      const xScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([5, 55, 85, 5, 55, 85])//percentages
      const yScale = d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5, 6])
        .range([0, 0, 0, 50, 50, 50])//percentages

      const forceX = (d) => {
        const container = this.$refs.chartContainer.getBoundingClientRect();
        const percentage = xScale(d.primaryPos <= 6 ? d.primaryPos : 6);

        const xPerPercentage = percentage * container.width / 100;
        if (percentage < 20) {
          const x = Math.max(170, xPerPercentage);
          if (this.coordinates.columns[0] === 0) {
            this.coordinates.columns[0] = x;
          }
          return x;
        } else if (percentage > 50) {
          const x = Math.min(container.width - 100, xPerPercentage);

          if (percentage > 80) {
            if (this.coordinates.columns[2] === 0) {
              this.coordinates.columns[2] = x;
            }
          } else {
            if (this.coordinates.columns[1] === 0) {
              this.coordinates.columns[1] = x;
            }
          }

          return x;
        }
      }
      const forceY = (d) => {
        const percentage = yScale(d.primaryPos <= 6 ? d.primaryPos : 6);
        const container = this.$refs.chartContainer.getBoundingClientRect();
        let y;
        if (percentage === 0) {
          y = 180;
        } else {
          y = Math.min(700, 75 * container.height / 100)
        }

        return y;
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
        .on('tick', this.ticked)
        .on('end', this.setLabels);

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
        .attr('class', (d) => `movie-${d.id}`)
        .attr("r", d => this.scale(d.revenue))
        .attr("fill", d => `url(#${this.title(d)})`)
    },
    setLabels () {
      const radius = this.coordinates.revenues.map(revenue => { return this.scale(revenue) });
      const names = this.sortByQty.map((group, index) => {
        return index > 4 ? 'others' : group[0].toLowerCase()
      });

      this.labels = this.svg
        .append("g")
        .attr('class', 'labels');

      for (let i = 1; i < 7; i++) {
        let x;
        let y;
        const spacing = 2;
        const textWidth = this.textWidth(names[i - 1]);
        switch (i) {
          case 1: {
            x = this.coordinates.columns[0] - textWidth / 2;
            y = this.coordinates.rows[0] + radius[0] * spacing;
            break;
          }
          case 2: {
            x = this.coordinates.columns[1] - textWidth / 2;
            y = this.coordinates.rows[0] + radius[0] * spacing;
            break;
          }
          case 3: {
            x = this.coordinates.columns[2] - textWidth / 2;
            y = this.coordinates.rows[0] + radius[0] * spacing;
            break;
          }
          case 4: {
            x = this.coordinates.columns[0] - textWidth / 2;
            y = this.coordinates.rows[1] + radius[1] * spacing / 2;
            break;
          }
          case 5: {
            x = this.coordinates.columns[1] - textWidth / 2;
            y = this.coordinates.rows[1] + radius[1] * spacing / 2;
            break;
          }
          case 6: {
            x = this.coordinates.columns[2] - textWidth / 2;
            y = this.coordinates.rows[1] + radius[1] * spacing;
            break;
          }
        }
        this.labels
          .append('text')
          .attr('x', x)
          .attr('y', y)
          .attr('fill', '#aa9d9c')
          .attr('font-size', '14')
          .text(() => {
            return names[i - 1];
          });

        if (i === 1) {
          this.labels
            .append('image')
            .attr('href', '/handmade-circle.gif')
            .attr('width', textWidth + 20)
            .attr('height', 34)
            .attr('x', x - 9)
            .attr('y', y - 22)
        }
      }
    },
    textWidth (text, fontSize = 14) {
      const temp = document.createElement('div');
      temp.style.position = "absolute";
      temp.innerHTML = "Hello";
      temp.setAttribute("type", "hidden");
      temp.style.fontSize = fontSize;
      document.body.appendChild(temp);
      const width = (temp.clientWidth + 1)

      temp.parentNode.removeChild(temp);

      return width;
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/common.scss';
svg {
  overflow: visible;
}
.small-chart-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: repeat(6, auto);
  padding: 1rem 10%;
}
</style>