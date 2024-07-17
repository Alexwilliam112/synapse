class Cache {
    constructor() {
      this.baseFilters = 'modelEngine:filters';
      this.baseData = 'modelEngine:data';
    }
  
    filters(CompanyId) {
      return `${this.baseFilters}:${CompanyId}`;
    }
  
    data(CompanyId) {
      return `${this.baseData}:${CompanyId}`;
    }
  }
  
  module.exports = new Cache();
  