module.exports = (() => {
  class Eventlog {
    constructor(eventlog = [], processes) {
      this.eventlog = eventlog
      this.processName = (()=> {
        return processes.join(', ')
      })()
    }
  }

  return Eventlog
})()