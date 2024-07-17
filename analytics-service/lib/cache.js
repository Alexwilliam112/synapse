
class Cache {
  constructor() {
    this.filters = 'analytics:filters'
    this.chartData = 'analytics:chartData'
  }
}

const cache = new Cache()
module.exports = cache