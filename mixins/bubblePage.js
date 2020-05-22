const d3 = require('d3')
import { slices } from '@/assets/js/helpers.js'

export default {
  data() {
    return {
      movies: [],
      groups: {},
      svg: null,
      nodes: null,
    }
  },
  async beforeMount() {
    if (this.hasMany) {
      const capitalized = this.keyword.replace(/^\w/, (c) => c.toUpperCase())
      const functionName = `check${capitalized}`
      await this.$store.dispatch(functionName)
    }

    //deep copy
    this.movies = JSON.parse(
      JSON.stringify(await this.$store.getters.movies(slices()))
    )
    const temp = this.groupBy(this.movies, this.keyword, this.hasMany)
    this.groups = Object.entries(temp).sort((a, b) => b[1].length - a[1].length)
  },

  methods: {
    groupBy(xs, key) {
      return xs.reduce((rv, x) => {
        let innerKey
        if (this.hasMany) {
          if(!this.singleKeyword){
            let singleKeyword = this.keyword.slice(0, -1)
            singleKeyword = singleKeyword === 'character' ? 'actor' : singleKeyword;
            this.singleKeyword = `${singleKeyword}_name`
          }
          innerKey = x[key].find((a) => a.primary||a.main)[this.singleKeyword]
        } else {
          innerKey = x[key] ? x[key].name : ''
        }
        if (innerKey) {
          ;(rv[innerKey] = rv[innerKey] || []).push(x)
        }
        return rv
      }, {})
    },
  },
}
