from pm4py.objects.log.importer.xes import importer as xes_importer
from pm4py.algo.discovery.alpha import algorithm as alpha_miner
from collections import Counter, defaultdict
import xml.etree.ElementTree as ET
from datetime import datetime
import tempfile
import os

def json_to_xes(eventlog):
    log = ET.Element("log", {"xes.version": "1.0", "xes.features": "nested-attributes", "openxes.version": "1.0RC7", "xmlns": "http://www.xes-standard.org/"})
    
    traces = {}
    
    for event in eventlog:
        case_id = event["caseId"]
        if case_id not in traces:
            traces[case_id] = ET.SubElement(log, "trace")
            ET.SubElement(traces[case_id], "string", {"key": "concept:name", "value": case_id})
        
        event_el = ET.SubElement(traces[case_id], "event")
        ET.SubElement(event_el, "string", {"key": "concept:name", "value": event["eventName"]})
        ET.SubElement(event_el, "string", {"key": "org:resource", "value": event["name"]})
        ET.SubElement(event_el, "string", {"key": "org:group", "value": event["department"]})
        timestamp = datetime.strptime(event["timestamp"], "%Y-%m-%d")
        ET.SubElement(event_el, "date", {"key": "time:timestamp", "value": timestamp.isoformat() + ".000+00:00"})
    
    xes_data = ET.tostring(log, encoding='utf-8', method='xml')
    return xes_data.decode('utf-8')

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

    # Create a mapping of original names to new keys with "T-" prefix for transitions
    transition_name_to_key = {transition.name: f"T-{index}" for index, transition in enumerate(transitions)}
    place_name_to_key = {place.name: place.name.split("'")[1] if "'" in place.name else place.name for place in places}

    # Format places
    formatted_places = [
        {
            "key": place_name_to_key[place.name],
            "frequency": place_frequencies.get(place_name_to_key[place.name], 0),
            "time": round(place_average_times.get(place_name_to_key[place.name], 0), 2)
        }
        for place in places if place.name not in ['start', 'end']
    ]

    # Format transitions using the new keys with "T-" prefix
    formatted_transitions = [
        {"key": transition_name_to_key[transition.name]}
        for transition in transitions
    ]

    # Format arcs, ensuring arcs referencing transitions use the new keys with "T-" prefix
    formatted_arcs = [
        {
            "from_": transition_name_to_key.get(str(arc.source).split("'")[1], place_name_to_key.get(str(arc.source).split("'")[1], str(arc.source))),
            "to": transition_name_to_key.get(str(arc.target).split("'")[1], place_name_to_key.get(str(arc.target).split("'")[1], str(arc.target)))
        }
        for arc in arcs
        if 'start' not in str(arc.source) and 'end' not in str(arc.target)
    ]

    formatted_output = {
        "places": formatted_places,
        "transitions": formatted_transitions,
        "arcs": formatted_arcs
    }
    print(formatted_output)
    return formatted_output

def extract_final_transitions(net, final_marking):
    final_transitions = set()
    for arc in net.arcs:
        if arc.target in final_marking:
            if arc.source.label:
                final_transitions.add(arc.source.label)
    return final_transitions

def calculate_fitness(log, final_transitions):
    total_cases = len(log)
    completed_cases = 0

    for trace in log:
        if len(trace) > 0:
            last_event = trace[-1]["concept:name"]
            if last_event in final_transitions:
                completed_cases += 1
                
    fitness = (completed_cases / total_cases) * 100 if total_cases > 0 else 0
    return fitness

def main(eventlog):
    try:
        xes_data = json_to_xes(eventlog)
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xes') as tmpfile:
            tmpfile.write(xes_data.encode('utf-8'))
            tmpfile_path = tmpfile.name

        log = xes_importer.apply(tmpfile_path)
        os.remove(tmpfile_path)
        place_frequencies, place_times = get_place_frequencies_and_times(log)
        place_average_times = calculate_average_times(place_frequencies, place_times)
        net, initial_marking, final_marking = alpha_miner.apply(log)
        
        final_transitions = extract_final_transitions(net, final_marking)
        
        fitness = calculate_fitness(log, final_transitions)
        formatted_net = format_petri_net(net, place_frequencies, place_average_times)
        formatted_net["fitness"] = fitness

        print("WORK DONE===============================")
        return formatted_net
    except Exception as e:
        print(f"Error in main function: {e}")
        return {}
