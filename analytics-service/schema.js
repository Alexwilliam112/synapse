
Table Tasks:
[
  {
    processName: str,
    eventName: str,
    department: str,
    time: float,
  }
]

Table Events:
[
  {
    id: int,
    frequency: float,
    benchmarkTime: float,
    ProcessId: int,
    eventName: str,
  }
]

[
  {
    processName: str,
    eventName: str,
    department: str,
    averageActual: (avg time of each same eventName group) int,
    benchmark: (from Events),
    conformanceRate: [(how many Task time < benchmarkTime) / total Task in same eventName group]
  }
]