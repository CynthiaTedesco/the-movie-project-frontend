const d3 = require("d3");
import tooltip from "@/mixins/tooltip.js";
import { isMobile, customKey, isTablet } from "../assets/js/helpers";
import { mapGetters } from "vuex";

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
      ticksDensity: 70,
      nodesGroup: null,
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
    ...mapGetters(["max"]),
    scale() {
      //scale for circle radius
      const maxRadius = Math.min((this.innerWidth / this.groups.length) * 0.7, 60);
      // console.log("maxRadius", maxRadius);
      return d3
        .scaleLinear()
        .domain([0, this.max])
        .range([10, maxRadius]);
    },
    xScale() {
      return d3
        .scalePoint()
        .domain(this.groups.map((g) => g[0]))
        .range([0, this.innerWidth]);
    },
  },
  methods: {
    appendSvg() {
      this.svg = this.container.selectAll("svg").data([null]);

      this.svg = this.svg
        .enter()
        .append("svg")
        .merge(this.svg)
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("class", "nodes");

      const { g, innerWidth, innerHeight } = this.marginConvention(this.svg, {
        width: this.width,
        height: this.height,
        margin: { top: 0, left: 70, right: 90, bottom: 100 },
      });

      this.innerWidth = innerWidth;
      this.innerHeight = innerHeight;

      this.marginGroup = g;
    },
    appendAxis() {
      const xAxis = d3
        .axisBottom(this.xScale)
        .tickPadding(30)
        .ticks(this.innerWidth / this.ticksDensity);
      let xAxisG = this.marginGroup.selectAll(".x-axis").data([null]);
      xAxisG = xAxisG
        .enter()
        .append("g")
        .attr("class", "x-axis")
        .merge(xAxisG)
        .attr("transform", `translate(0, ${this.innerHeight - 60})`);

      const self = this;

      xAxisG.call(xAxis);
      xAxisG
        .selectAll(".tick text")
        .attr("class", (d) => {
          const classes = ["tick-label"];

          const key = customKey(self.attr, self.singleKeyword);
          if (self.$store.getters["winners"][key] === d.toLowerCase()) {
            classes.push("winner");
          }
          return classes.join(" ");
        })
        .attr("fill", "gray")
        .style("font-size", "14px");

      const distance =
        this.xScale(this.groups[1][0]) - this.xScale(this.groups[0][0]);

      xAxisG
        .selectAll(".tick line")
        .attr("stroke", "gray")
        .attr("transform", `translate(${distance / 2}, 35)`)
        .attr("y2", (d, i, a) => {
          if (i + 1 === a.length) {
            return "0";
          } else {
            return "15";
          }
        });
      xAxisG.selectAll(".domain").attr("stroke", "transparent");

      const xAxisLabels = xAxisG.selectAll("text").data([null]);
      xAxisLabels
        .enter()
        .append("text")
        .merge(xAxisLabels);

      //append winner image
      const winner = xAxisG.select(".winner");
      winner
        .select(function() {
          return this.parentNode;
        })
        .append("image")
        .attr("href", "/handmade-circle.gif")
        .attr("width", this.textWidth(winner.text()) + 20)
        .attr("height", 34)
        .attr("preserveAspectRatio", "none")
        .attr("x", (-1 * this.textWidth(winner.text())) / 2 - 10)
        .attr("y", 22);
    },
    appendCircles(data = this.data) {
      this.nodesGroup = this.marginGroup.selectAll(".nodes-group").data([null]);
      this.nodesGroup = this.nodesGroup
        .enter()
        .append("g")
        .attr("class", "nodes-group")
        .merge(this.nodesGroup);

      this.nodes = this.nodesGroup.selectAll("circle").data(data);
      this.nodes = this.nodes
        .enter()
        .append("circle")
        .merge(this.nodes)
        .attr("class", (d) => `movie-${d.id}`)
        .attr("fill", "red")
        .attr("cx", (d) => this.xScale(this.xValue(d)))
        .attr("r", 0)
        .attr("fill", (d) => `url(#${this.defTitle(d)})`);
      if (this.width > 500) {
        this.nodes
          .on("mouseover", this.showTooltip)
          .on("mouseleave", this.hideTooltip)
          // .on("mousemove", this.moveTooltip);
      }

      this.nodes
        .transition()
        .duration(500)
        .attr("r", (d) => this.scale(d.revenue));

      //removes dom elements not corresponding to any data
      this.marginGroup
        .selectAll("circle")
        .data(data)
        .exit()
        .remove();
    },
    appendDefinitions(data = this.data) {
      let defs = this.svg.selectAll("defs").data([null]);
      defs = defs
        .enter()
        .append("defs")
        .merge(defs);

      defs = this.svg.selectAll(".poster-pattern").data(data);
      defs = defs
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
        .attr("xlink:href", (d) => d.poster.url)
        .merge(defs);
    },
    defTitle(d) {
      return (
        d.title
          .split(" ")
          .join("-")
          .split("'")
          .join("")
      );
    },
    createSimulation(props) {
      const { xForce, yForce, onTickFn, onEndFn, data } = props;

      this.simulation = d3
        .forceSimulation(data || this.data)
        .force("x", d3.forceX(xForce).strength(0.4))
        .force("y", d3.forceY(yForce).strength(0.1))
        .force(
          "collide",
          d3
            .forceCollide((d) => this.scale(d.revenue) + 7)
            // .strength(0.5)
            .iterations(15)
        )
        .on("tick", onTickFn);
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
