import sys
from collections import Counter, defaultdict
from pm4py.objects.log.importer.xes import importer as xes_importer
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from datetime import datetime

def get_place_frequencies_and_times(log):
    place_counter = Counter()
    place_times = defaultdict(float)
    for trace in log:
        for i in range(1, len(trace)):
            event = trace[i]
            prev_event = trace[i - 1]
            place_counter[event['concept:name']] += 1
            
            timestamp = prev_event['time:timestamp']
            next_timestamp = event['time:timestamp']
            time_diff = (next_timestamp - timestamp).total_seconds() / (60 * 60 * 24)  # Convert to days
            place_times[event['concept:name']] += time_diff
            
        # Add the first event in the trace (if we want to count the first events as well)
        first_event = trace[0]
        place_counter[first_event['concept:name']] += 1

    return place_counter, place_times

def calculate_average_times(place_frequencies, place_times):
    place_average_times = {}
    for place, total_time in place_times.items():
        frequency = place_frequencies[place]
        average_time = total_time / frequency if frequency > 0 else 0
        place_average_times[place] = average_time
    return place_average_times

def format_petri_net(net, place_frequencies, place_average_times):
    places = list(net.places)
    transitions = list(net.transitions)
    arcs = list(net.arcs)

    # Extract event names from places and add 'T:' prefix, remove 'start' and 'end'
    formatted_places = [{"key": f"T:{place.name.split("'")[1] if "'" in place.name else place.name}", 
                         "frequency": place_frequencies.get(place.name.split("'")[1] if "'" in place.name else place.name, 0),
                         "time": round(place_average_times.get(place.name.split("'")[1] if "'" in place.name else place.name, 0), 2)} 
                        for place in places if place.name not in ['start', 'end']]
    
    formatted_transitions = [{"key": f"{transition.name}"} for transition in transitions]

    # Format arcs and remove arcs that point to/from 'start' and 'end'
    formatted_arcs = [{"from": f"T:{str(arc.source).split("'")[1] if "'" in str(arc.source) else str(arc.source)}",
                       "to": f"T:{str(arc.target).split("'")[1] if "'" in str(arc.target) else str(arc.target)}"} 
                      for arc in arcs if 'start' not in str(arc.source) and 'end' not in str(arc.target)]

    formatted_output = {
        "places": formatted_places,
        "transitions": formatted_transitions,
        "arcs": formatted_arcs
    }
    return formatted_output

def main(file_path):
    log = xes_importer.apply(file_path)
    place_frequencies, place_times = get_place_frequencies_and_times(log)
    place_average_times = calculate_average_times(place_frequencies, place_times)
    net, initial_marking, final_marking = alpha_miner.apply(log)
    
    formatted_net = format_petri_net(net, place_frequencies, place_average_times)
    
    print("Petri Net:")
    print(f"Events: {formatted_net['places']}")
    print(f"States: {formatted_net['transitions']}")
    print(f"Arcs: {formatted_net['arcs']}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python process_miner.py <path_to_xes_file>")
        sys.exit(1)
    
    xes_file_path = sys.argv[1]
    main(xes_file_path)