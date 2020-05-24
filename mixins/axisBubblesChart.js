const d3 = require("d3");
import { isMobile } from "@/assets/js/helpers.js";
import tooltip from "@/mixins/tooltip.js";

export default {
  mixins: [tooltip],
  data() {
    return {
      svg: null,
      marginGroup: null,
      nodes: null,
      simulation: null,
      categoriesNames: [],
      innerWidth: null,
      innerHeight: null,
    };
  },
  beforeDestroy() {
    if (this.simulation) {
      this.simulation.stop();
    }
  },
  props: {
    movies: Array,
  },
  computed: {
    scale() {
      const maxRadius = isMobile()
        ? (Math.min(this.width, this.height) * 0.3) / 2
        : Math.min(this.width, this.height) * 0.1;
      console.log("maxRadius", maxRadius);
      return d3
        .scaleLinear()
        .domain([0, this.max])
        .range([10, maxRadius]);
    },
  },
  methods: {
    appendSvg() {
      const chartContainerSelector = this.selector || ".chart-container";
      const parentSelector = this.singleKeyword
        ? `${this.attr}-${this.singleKeyword}`
        : this.attr;

      const container = d3.selectAll(
        `#${parentSelector} ${chartContainerSelector}`
      );

      this.svg = container.selectAll("svg").data([null]);

      this.svg = this.svg
        .enter()
        .append("svg")
        .merge(this.svg)
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("class", "nodes")
        .style("border", "1px solid black");

      const { g, innerWidth, innerHeight } = this.marginConvention(this.svg, {
        width: this.width,
        height: this.height,
        margin: { top: 0, left: 40, right: 40, bottom: 75 },
      });

      this.innerWidth = innerWidth;
      this.innerHeight = innerHeight;

      this.marginGroup = g;

      let rect = this.marginGroup.selectAll("rect").data([null]);
      rect = rect
        .enter()
        .append("rect")
        .merge(rect)
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("rx", 100)
        .attr("fill", "black");
    },
    appendAxis() {
      const xScale = d3
        .scaleLinear()
        .domain([0, this.groups.length-1])
        .range([0, this.innerWidth]);
      const xAxis = d3.axisBottom(xScale);
      let xAxisG = this.marginGroup.selectAll(".x-axis").data([null]);
      xAxisG = xAxisG
        .enter()
        .append("g")
        .attr("class", "x-axis")
        .merge(xAxisG)
        .attr("transform", `translate(0, ${this.innerHeight})`);

      xAxisG.call(xAxis);
      xAxisG
        .selectAll(".tick text")
        .attr("fill", "gray")
        .style('font-size', '14px')
        .text(this.tickText);
      xAxisG.selectAll(".tick line").attr("stroke", "transparent");
      xAxisG.selectAll(".domain").attr("stroke", "transparent");

      const xAxisLabels = xAxisG.selectAll("text").data([null]);
      xAxisLabels
        .enter()
        .append("text")
        .merge(xAxisLabels);
    },
    tickText(d, i) {
      if (this.groups.length <= i) {
        return "";
      }
      return this.groups[i][0];
    },
    appendCircles(data = this.data) {
      this.nodes = this.svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", (d) => `movie-${d.id}`)
        .attr("r", 0)
        .attr("fill", (d) => `url(#${this.defTitle(d)})`)
        .on("mouseover", this.showTooltip)
        .on("mouseleave", this.hideTooltip);
      if (this.width > 500) {
        this.nodes.on("mousemove", this.moveTooltip);
      }

      this.nodes
        .transition()
        .duration(500)
        .attr("r", (d) => this.scale(d.revenue));

      //removes dom elements not corresponding to any data
      this.svg
        .selectAll("circle")
        .data(data)
        .exit()
        .remove();
    },
    appendDefinitions(data = this.data) {
      const defs = this.svg.append("defs");

      defs
        .selectAll("poster-pattern")
        .data(data)
        .enter()
        .append("pattern")
        .attr("class", "poster-pattern")
        .attr("id", this.defTitle)
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", (d) => d.poster.url);
    },
    defTitle(d) {
      return (
        this.attr +
        "-" +
        d.title
          .split(" ")
          .join("-")
          .split("'")
          .join("")
      );
    },
    createSimulation(name, props) {
      switch (name) {
        case "category": {
          const { xForce, yForce, onTickFn, onEndFn, data } = props;

          // the simulation is a collection of forces
          // about where we want our circles to go
          // and how we want out circles to interact
          // STEP 1: get them to the middle
          // STEP 2: don't have them collide!

          this.simulation = d3
            .forceSimulation(data || this.data)
            .force("x", d3.forceX(xForce).strength(0.1))
            .force("y", d3.forceY(yForce).strength(0.1))
            .force(
              "collide",
              d3.forceCollide((d) => this.scale(d.revenue) + 2)
            )
            .on("tick", onTickFn)
            .on("end", onEndFn || this.onEndSimulation);
          break;
        }
        case "timeline": {
        }
      }
    },
    onEndSimulation() {
      this.adjustLabels();
    },
    marginConvention(selection, props) {
      const { width, height, margin, className = "margin-group" } = props;

      let g = selection.selectAll(`.${className}`).data([null]);
      g = g
        .enter()
        .append("g")
        .merge(g)
        .attr("class", `${className}`)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      return { g, innerWidth, innerHeight };
    },
  },
};
