import grpc
from concurrent import futures
import temporalAnalysis_pb2
import temporalAnalysis_pb2_grpc
from temporal_interval import process_event_log

class TemporalMinerServicer(temporalAnalysis_pb2_grpc.TemporalMinerServicer):
    def GetTaskHistory(self, request, context):
        try:
            print("Received request:", request)
            eventlog = []
            for event in request.eventlogs:
                print(event)
                eventlog.append({
                    "processName": event.processName,
                    "caseId": event.caseId,
                    "timestamp": event.timestamp,
                    "eventName": event.eventName,
                    "name": event.name,
                    "department": event.department,
                    "CompanyId": request.CompanyId,
                    "caseReff": event.caseReff
                })

            # Process the event log using the function from temporal_interval
            processed_history = process_event_log(eventlog)
            response = temporalAnalysis_pb2.TaskHistory()

            for task in processed_history:
                json_task = response.history.add()
                json_task.processName = task['processName']
                json_task.caseId = task['caseId']
                json_task.timestamp = task['timestamp']
                json_task.eventName = task['eventName']
                json_task.name = task['name']
                json_task.department = task['department']
                json_task.CompanyId = task['CompanyId']
                json_task.time = task['time']

            return response
        except Exception as e:
            context.set_details(f'Exception calling application: {str(e)}')
            context.set_code(grpc.StatusCode.UNKNOWN)
            return temporalAnalysis_pb2.TaskHistory()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    temporalAnalysis_pb2_grpc.add_TemporalMinerServicer_to_server(TemporalMinerServicer(), server)
    server.add_insecure_port('[::]:50053')
    server.start()
    print("Server started on port 50053")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
