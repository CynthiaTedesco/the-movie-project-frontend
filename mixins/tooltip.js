import { sanitizedId } from "../assets/js/helpers";

const d3 = require("d3");

export default {
  data() {
    return {
      tooltip: null,
    };
  },
  mounted() {
    const container = this.axis
      ? this.container
      : d3.select(sanitizedId(this.attr, this.selector || "chart-container"));
    this.tooltip = container
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#2b49b9")
      .style("padding", "10px")
      .style("color", "white");
  },
  methods: {
    estimatedWidth(d) {
      let estimatedWidth = 0;
      if (this.axis) {
        if (d.axisGroups[this.attr].tooltip) {
          const movieTitle = this.textWidth(d.title);
          const subTooltip = d.axisGroups[this.attr].tooltip;
          estimatedWidth = Math.max(
            this.textWidth(movieTitle),
            this.textWidth(subTooltip)
          );
        }
      } else {
        estimatedWidth = this.textWidth(d.title);
      }

      return estimatedWidth;
    },
    showTooltip(d, index, circles) {
      const origin = circles[index];

      let subTooltip = "";
      if (this.axis) {
        if (d.axisGroups[this.attr].tooltip) {
          subTooltip = d.axisGroups[this.attr].tooltip;
        }
      } else {
        subTooltip =
          d.category[this.attr].tooltip || d.category[this.attr].name;
      }
      const html = `<strong>${d.title}</strong><br/>${subTooltip}`;

      this.tooltip.transition().duration(200);
      this.tooltip
        .style("opacity", 1)
        .style("top", d3.mouse(origin)[1] + 20 + "px")
        .html(html);

      if (this.width < 400) {
        this.tooltip.style("max-width", "250px");
      } else {
        this.tooltip.style("min-width", this.estimatedWidth(d) + 30 + "px");
      }
      const left = d3.mouse(origin)[0] + 30;
      const separation = this.width < 400 ? 20 : 100;
      if (left + this.estimatedWidth(d) > this.width) {
        this.tooltip.style("right", separation + "px").style("left", "unset");
      } else {
        this.tooltip.style("left", left + "px").style("right", "unset");
      }
    },
    moveTooltip(d, index, circles) {
      const origin = circles[index];
      const left = d3.mouse(origin)[0] + 30;
      const separation = this.width < 400 ? 20 : 100;

      this.tooltip.style("top", d3.mouse(origin)[1] + 20 + "px");

      if (left + this.estimatedWidth(d) + 40 > this.width) {
        this.tooltip.style("right", separation + "px").style("left", "unset");
        // this.tooltip.style('left', 'unset').style('right', separation+'px')
      } else {
        this.tooltip.style("left", left + "px").style("right", "unset");
      }
    },
    hideTooltip(d) {
      this.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    },
  },
};
