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
      : d3.select(sanitizedId(this.attr, this.selector || ".chart-container"));
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
    showTooltip(event, origin) {
      let subTooltip = "";
      if (this.axis) {
        if (origin.axisGroups[this.attr].tooltip) {
          subTooltip = origin.axisGroups[this.attr].tooltip;
        }
      } else {
        subTooltip =
          origin.category[this.attr].tooltip || origin.category[this.attr].name;
      }
      const html = `<strong>${origin.title}</strong><br/>${subTooltip}`;

      this.tooltip.transition().duration(200);
      const top = event.target.cy.animVal.value + 20;
      this.tooltip
        .style("opacity", 1)
        .style("top", top + "px")
        .html(html);

      if (this.width < 400) {
        this.tooltip.style("max-width", "250px");
      } else {
        this.tooltip.style("min-width", this.estimatedWidth(origin) + 30 + "px");
      }
      const left = event.target.cx.animVal.value + 30;
      const separation = this.width < 400 ? 20 : 100;
      if (left + this.estimatedWidth(origin) > this.width) {
        this.tooltip.style("right", separation + "px").style("left", "unset");
      } else {
        this.tooltip.style("left", left + "px").style("right", "unset");
      }
    },
    moveTooltip(event, origin) {
      // console.log('moveTooltip. TOP____', event.clientY + 20);
      // const left = event.clientX + 30;
      // const separation = this.width < 400 ? 20 : 100;

      // this.tooltip.style("top", event.clientY + 20 + "px");

      // if (left + this.estimatedWidth(origin) + 40 > this.width) {
      //   this.tooltip.style("right", separation + "px").style("left", "unset");
      //   // this.tooltip.style('left', 'unset').style('right', separation+'px')
      // } else {
      //   this.tooltip.style("left", left + "px").style("right", "unset");
      // }
    },
    hideTooltip() {
      this.tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    },
  },
};
