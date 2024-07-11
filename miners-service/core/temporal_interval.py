import sys
import pandas as pd
from pm4py.objects.log.importer.xes import importer as xes_importer
import json

xes_file_path = sys.argv[1]
output_file_path = sys.argv[2]
log = xes_importer.apply(xes_file_path)

data = []
for trace in log:
    for event in trace:
        data.append({
            "processName": event["concept:name"],
            "caseId": trace.attributes["concept:name"],
            "timestamp": event["time:timestamp"],
            "eventName": event["concept:name"],
            "name": event["org:resource"] if "org:resource" in event else None,
            "department": event["org:role"] if "org:role" in event else None
        })

df = pd.DataFrame(data)

df['timestamp'] = pd.to_datetime(df['timestamp'])
df = df.sort_values(by=['caseId', 'timestamp'])

df['time'] = df.groupby('caseId')['timestamp'].diff().dt.total_seconds().fillna(0) / (24 * 60 * 60)
df['time'] = df['time'].map(lambda x: f"{x:.2f}")

df = df.drop(columns=['timestamp'])
result = df.to_dict(orient='records')

with open(output_file_path, 'w') as f:
    json.dump(result, f, indent=4)

print(f"Results saved to {output_file_path}")
