class Cache {
  constructor() {
    this.baseFilters = 'analytics:filters';
    this.baseChartData = 'analytics:chartData';
  }

  filters(CompanyId) {
    return `${this.baseFilters}:${CompanyId}`;
  }

  chartData(CompanyId) {
    return `${this.baseChartData}:${CompanyId}`;
  }
}

const cache = new Cache();
module.exports = cache;
