const d3 = require("d3");
import { isMobile, sanitizedId, isTablet } from "../assets/js/helpers";

export default {
  data() {
    return {
      width: 0,
      height: 0,
      maxCYs: [0, 0],
      coordinates: {},
      minimimAxisWidth: 768
    };
  },
  computed: {
    container() {
      return d3.select(this.$el);
    }
  },
  methods: {
    setDimensions() {
      if (this.$refs.chartContainer || this.selector) {
        const container = this.$refs.chartContainer
          ? this.$refs.chartContainer.getBoundingClientRect()
          : d3
              .select(sanitizedId(this.attr, this.selector))
              .node()
              .getBoundingClientRect();

        //container does not resized itself if it already contains a fixed sized svg inside!
        this.width = Math.min(container.width, document.body.clientWidth);

        if (this.axis) {
          this.width =
            this.width < this.minimimAxisWidth
              ? this.minimimAxisWidth
              : this.width;
        }
        this.height = container.height;
      }

      //if is hidden and we are in a mobile view
      //then we force dimensions to be the same as its container
      if (!this.width || !this.height) {
        if ((isMobile()||isTablet()) && this.$parent.$refs.inner) {
          const container = this.$parent.$refs.inner.getBoundingClientRect();
          this.width = container.width;
          this.height = container.height;
        }
      }
    },
    textWidth(text, fontSize = 14) {
      const temp = document.createElement("div");
      temp.style.position = "absolute";
      temp.innerHTML = text;
      temp.setAttribute("type", "hidden");
      temp.style.fontSize = fontSize;
      document.body.appendChild(temp);
      const width = temp.clientWidth + 1;

      temp.parentNode.removeChild(temp);

      return width;
    },
  },
};
