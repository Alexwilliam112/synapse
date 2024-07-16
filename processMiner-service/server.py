from concurrent import futures
import grpc
import processMining_pb2
import processMining_pb2_grpc
from miner import main  # Import the main function from miner.py

class AlphaMinerServicer(processMining_pb2_grpc.AlphaMinerServicer):
    def GetProcessModel(self, request, context):
        try:
            print("Received request:")
            response = processMining_pb2.JsonModelList()
            print("Success Request from Miner-Service")

            for event_log in request.eventlog:
                print(f"Processing EventLog for processName: {event_log.processName}")
                eventlog = []
                for event in event_log.eventlog:
                    eventlog.append({
                        "processName": event.processName,
                        "caseId": event.caseId,
                        "timestamp": event.timestamp,
                        "eventName": event.eventName,
                        "name": event.name,
                        "department": event.department,
                        "caseReff": event.caseReff
                    })
                formatted_net = main(eventlog)
                
                json_model = processMining_pb2.JsonModel(processName=event_log.processName)
                
                for place in formatted_net['places']:
                    json_model.places.add(
                        key=place['key'],
                        frequency=place['frequency'],
                        time=place['time']
                    )

                for transition in formatted_net['transitions']:
                    json_model.transitions.add(key=transition['key'])

                for arc in formatted_net['arcs']:
                    json_model.arcs.add(from_=arc['from_'], to=arc['to'])
                
                json_model.fitness = formatted_net.get('fitness', 0)

                response.models.append(json_model)

            return response
        except Exception as e:
            context.set_details(f'Exception calling application: {str(e)}')
            context.set_code(grpc.StatusCode.UNKNOWN)
            
            print("Error================", e)
            return processMining_pb2.JsonModelList()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    processMining_pb2_grpc.add_AlphaMinerServicer_to_server(AlphaMinerServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
