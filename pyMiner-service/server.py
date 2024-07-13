from concurrent import futures
import grpc
import processMining_pb2
import processMining_pb2_grpc
from miner import main  # Import the main function from miner.py

class AlphaMinerServicer(processMining_pb2_grpc.AlphaMinerServicer):
    def GetProcessModel(self, request, context):
        try:
            print("Received request:")
            eventlog = []
            for event in request.data:
                print(event)
                eventlog.append({
                    "processName": event.processName,
                    "caseId": event.caseId,
                    "timestamp": event.timestamp,
                    "eventName": event.eventName,
                    "name": event.name,
                    "department": event.department
                })
            formatted_net = main(eventlog)
            response = processMining_pb2.JsonModel()

            for place in formatted_net['places']:
                response.places.add(
                    key=place['key'],
                    frequency=place['frequency'],
                    time=place['time']
                )

            for transition in formatted_net['transitions']:
                response.transitions.add(key=transition['key'])

            for arc in formatted_net['arcs']:
                response.arcs.add(from_=arc['from'], to=arc['to'])

            return response
        except Exception as e:
            context.set_details(f'Exception calling application: {str(e)}')
            context.set_code(grpc.StatusCode.UNKNOWN)
            return processMining_pb2.JsonModel()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    processMining_pb2_grpc.add_AlphaMinerServicer_to_server(AlphaMinerServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
