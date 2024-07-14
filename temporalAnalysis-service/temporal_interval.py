import pandas as pd
import json
from datetime import datetime

def process_event_log(eventlog):
    data = []
    for event in eventlog:
        data.append({
            "processName": event["processName"],
            "caseId": event["caseId"],
            "timestamp": event["timestamp"],
            "eventName": event["eventName"],
            "name": event["name"],
            "department": event["department"],
            "CompanyId": event["CompanyId"],
        })

    df = pd.DataFrame(data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values(by=['caseId', 'timestamp'])

    # Calculate the time difference in days and format it to 2 decimal places
    df['time'] = df.groupby('caseId')['timestamp'].diff().dt.total_seconds().fillna(0) / (24 * 60 * 60)
    df['time'] = df['time'].map(lambda x: float(f"{x:.3f}"))

    df['timestamp'] = df['timestamp'].dt.strftime('%Y-%m-%d %H:%M:%S')
    result = df.to_dict(orient='records')
    
    return result
