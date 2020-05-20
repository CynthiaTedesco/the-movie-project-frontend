const d3 = require('d3')

export default {
  data() {
    return {
      data: [],
    }
  },
  props: {
    movies: Array,
    groups: Array,
    attr: String,
    hasMany: Boolean,
  },
  mounted() {
    if (this.movies) {
      const updatedMovies = this.movies.map((m) => {
        m.category = m.category || {}
        if (this.hasMany) {
          const primary = m[this.attr].find((a) => a.primary)
          m.category[this.attr] = {
            name: primary[this.innerNameKey],
            position:
              this.groups.findIndex(
                (s) => s[0] === primary[this.innerNameKey]
              ) + 1,
          }
        } else {
          m.category[this.attr] = {
            name: m[this.attr][this.innerNameKey],
            position:
              this.groups.findIndex(
                (s) => s[0] === m[this.attr][this.innerNameKey]
              ) + 1,
          }
        }
        return m
      })
      //small display --> draw separate chart for each category
      if (this.small) {
        //create 'others' group if necessary
        if (this.isMultiline && this.groups.length > 6) {
          this.data = [...this.groups.slice(0, 5)]
          const others = this.groups
            .slice(5, this.groups.length)
            .map((a) => a[1])
            .flat()
          this.data.push(['Others', others])
        } else {
          this.data = this.groups
        }
      } else {
        //large display --> draw one svg with different groups for each category
        this.data = updatedMovies
      }
    }
  },
  computed: {
    innerNameKey() {
      if (this.hasMany) {
        const singleName = this.attr.slice(0, -1)
        return `${singleName}_name`
      }

      return 'name'
    },
    isMultiline() {
      return this.groups.length > 3
    },
    max() {
      return Math.max.apply(
        Math,
        this.movies.map((d) => d.revenue)
      )
    },
  },
}
