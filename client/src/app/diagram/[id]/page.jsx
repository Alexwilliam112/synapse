/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
"use client";
import * as go from "gojs";
import { produce } from "immer";
import React from "react";
import { saveAs } from "file-saver";

import { DiagramWrapper } from "../../../components/diagram/DiagramWrapper";
import { SelectionInspector } from "../../../components/diagram/SelectionInspector";
import makeClient from "@/config/ApolloClient";
import { getModelById, updateEvent } from "@/queries";

const colorMapping = {
  lightblue: "#50B8E7",
  orange: "#FFA500",
  lightgreen: "#90EE90",
  pink: "#FFC0CB",
  yellow: "#FFFF00",
  purple: "#800080",
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  gray: "#808080",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeDataArray: [],
      linkDataArray: [],
      modelData: {
        canRelink: true,
      },
      selectedData: null,
      skipsDiagramUpdate: false,
      newNodeText: "",
      newNodeColor: "lightblue",
      newNodeShape: "RoundedRectangle",
      newLinkText: "",
      newLinkFrom: 0,
      newLinkTo: 1,
      currentFileName: null,
      loading: true, // Initialize loading state
      modalNodeData: null,
      fetchedData: null,
      benchmarkTimeInput: "",
    };
    this.mapNodeKeyIdx = new Map();
    this.mapLinkKeyIdx = new Map();
    this.refreshNodeIndex(this.state.nodeDataArray);
    this.refreshLinkIndex(this.state.linkDataArray);
    this.handleDiagramEvent = this.handleDiagramEvent.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRelinkChange = this.handleRelinkChange.bind(this);
    this.handleAddNode = this.handleAddNode.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShapeClick = this.handleShapeClick.bind(this);
    this.handleBenchmarkTimeChange = this.handleBenchmarkTimeChange.bind(this);
    this.handleBenchmarkTimeSubmit = this.handleBenchmarkTimeSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.params.id;
    // console.log(id, "iniiiii");
    // console.log(this.props.params.id);
    this.fetchData(id);
  }

  async fetchData(id) {
    // console.log(id);
    const { data } = await makeClient().query({
      query: getModelById,
      variables: {
        input: {
          id: Number(id),
        },
      },
    });

    this.setState({ fetchedData: data?.GetById?.data, loading: false });
    const mappedData = {
      nodeDataArray: [],
      linkDataArray: [],
      modelData: { canRelink: true },
    };

    // Mapping events and states to nodeDataArray
    let nodeId = 0;
    data?.GetById?.data?.states?.forEach((state) => {
      mappedData.nodeDataArray.push({
        id: state.eventName,
        eventName: state.eventName,
        color: state.color,
        shape: state.shape === "Ellipse" ? "Ellipse" : "RoundedRectangle",
        isTextEditable: state.isTextEditable,
      });
    });

    data?.GetById?.data?.events?.forEach((event) => {
      mappedData.nodeDataArray.push({
        id: event.eventName,
        eventName: event.eventName,
        color: event.color === "#FF0099" ? "orange" : "yellow",
        shape:
          event.shape === "Rounded rectangle" ? "RoundedRectangle" : "Ellipse",
        isTextEditable: event.isTextEditable,
        // ...event,
      });
    });

    // Mapping dataLinks to linkDataArray
    data?.GetById?.data?.dataLinks?.forEach((link) => {
      mappedData.linkDataArray.push({
        id: link.id,
        from: link.from,
        to: link.to,
        text: link.text,
        canRelinkFrom: link.canRelinkFrom,
      });
    });

    this.setState({ ...mappedData, loading: false }); // Set loading to false once data is fetched
    console.log(mappedData);
  }

  refreshNodeIndex(nodeArr) {
    this.mapNodeKeyIdx.clear();
    nodeArr.forEach((n, idx) => {
      this.mapNodeKeyIdx.set(n.id, idx);
    });
  }

  refreshLinkIndex(linkArr) {
    this.mapLinkKeyIdx.clear();
    linkArr.forEach((l, idx) => {
      this.mapLinkKeyIdx.set(l.id, idx);
    });
  }

  handleDiagramEvent(e) {
    const name = e.name;
    switch (name) {
      case "ChangedSelection": {
        const sel = e.subject.first();
        this.setState(
          produce((draft) => {
            if (sel) {
              if (sel instanceof go.Node) {
                const idx = this.mapNodeKeyIdx.get(sel.data.id);
                if (idx !== undefined && idx >= 0) {
                  const nd = draft.nodeDataArray[idx];
                  draft.selectedData = nd;
                }
              } else if (sel instanceof go.Link) {
                const idx = this.mapLinkKeyIdx.get(sel.data.id);
                if (idx !== undefined && idx >= 0) {
                  const ld = draft.linkDataArray[idx];
                  draft.selectedData = ld;
                }
              }
            } else {
              draft.selectedData = null;
            }
          })
        );
        break;
      }
      default:
        break;
    }
  }

  handleModelChange(obj) {
    const insertedNodeKeys = obj.insertedNodeKeys;
    const modifiedNodeData = obj.modifiedNodeData;
    const removedNodeKeys = obj.removedNodeKeys;
    const insertedLinkKeys = obj.insertedLinkKeys;
    const modifiedLinkData = obj.modifiedLinkData;
    const removedLinkKeys = obj.removedLinkKeys;
    const modifiedModelData = obj.modelData;

    const modifiedNodeMap = new Map();
    const modifiedLinkMap = new Map();
    this.setState(
      produce((draft) => {
        let narr = draft.nodeDataArray;
        if (modifiedNodeData) {
          modifiedNodeData.forEach((nd) => {
            modifiedNodeMap.set(nd.id, nd);
            const idx = this.mapNodeKeyIdx.get(nd.id);
            if (idx !== undefined && idx >= 0) {
              narr[idx] = nd;
              if (draft.selectedData && draft.selectedData.id === nd.id) {
                draft.selectedData = nd;
              }
            }
          });
        }
        if (insertedNodeKeys) {
          insertedNodeKeys.forEach((key) => {
            const nd = modifiedNodeMap.get(key);
            const idx = this.mapNodeKeyIdx.get(key);
            if (nd && idx === undefined) {
              this.mapNodeKeyIdx.set(nd.id, narr.length);
              narr.push(nd);
            }
          });
        }
        if (removedNodeKeys) {
          narr = narr.filter((nd) => !removedNodeKeys.includes(nd.id));
          draft.nodeDataArray = narr;
          this.refreshNodeIndex(narr);
        }

        let larr = draft.linkDataArray;
        if (modifiedLinkData) {
          modifiedLinkData.forEach((ld) => {
            modifiedLinkMap.set(ld.id, ld);
            const idx = this.mapLinkKeyIdx.get(ld.id);
            if (idx !== undefined && idx >= 0) {
              larr[idx] = ld;
              if (draft.selectedData && draft.selectedData.id === ld.id) {
                draft.selectedData = ld;
              }
            }
          });
        }
        if (insertedLinkKeys) {
          insertedLinkKeys.forEach((key) => {
            const ld = modifiedLinkMap.get(key);
            const idx = this.mapLinkKeyIdx.get(key);
            if (ld && idx === undefined) {
              this.mapLinkKeyIdx.set(ld.id, larr.length);
              larr.push(ld);
            }
          });
        }
        if (removedLinkKeys) {
          larr = larr.filter((ld) => !removedLinkKeys.includes(ld.id));
          draft.linkDataArray = larr;
          this.refreshLinkIndex(larr);
        }
        if (modifiedModelData) {
          draft.modelData = modifiedModelData;
        }
        draft.skipsDiagramUpdate = true;
      })
    );
  }

  handleInputChange(path, value, isBlur) {
    this.setState(
      produce((draft) => {
        const data = draft.selectedData;
        data[path] = value;
        if (isBlur) {
          const id = data.id;
          if (id < 0) {
            const idx = this.mapLinkKeyIdx.get(id);
            if (idx !== undefined && idx >= 0) {
              draft.linkDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          } else {
            const idx = this.mapNodeKeyIdx.get(id);
            if (idx !== undefined && idx >= 0) {
              draft.nodeDataArray[idx] = data;
              draft.skipsDiagramUpdate = false;
            }
          }
        }
      })
    );
  }

  handleRelinkChange(e) {
    const target = e.target;
    const value = target.checked;
    this.setState({
      modelData: { canRelink: value },
      skipsDiagramUpdate: false,
    });
  }
  handleShapeClick(nodeData) {
    const { fetchedData } = this.state;

    // Find the full data for the clicked node
    const selectedNodeData = fetchedData?.events?.find(
      (event) => event.eventName === nodeData.eventName
    );

    if (selectedNodeData && selectedNodeData.shape === "Rounded rectangle") {
      this.setState({
        modalNodeData: selectedNodeData,
        benchmarkTimeInput: selectedNodeData.benchmarkTime || "",
      });
      document.getElementById("my_modal_3").showModal();
    }
  }

  handleBenchmarkTimeChange(event) {
    this.setState({ benchmarkTimeInput: event.target.value });
  }

  async handleBenchmarkTimeSubmit(event) {
    event.preventDefault();
    const { modalNodeData, benchmarkTimeInput, fetchedData } = this.state;

    try {
      // Call the GraphQL mutation to update the event
      await makeClient().mutate({
        mutation: updateEvent,
        variables: {
          input: [
            {
              id: modalNodeData.id,
              eventName: modalNodeData.eventName,
              identifier: modalNodeData.identifier,
              frequency: modalNodeData.frequency,
              time: modalNodeData.time,
              benchmarkTime: parseFloat(benchmarkTimeInput),
              isTextEditable: modalNodeData.isTextEditable,
              color: modalNodeData.color,
              shape: modalNodeData.shape,
              ProcessId: modalNodeData.ProcessId,
            },
          ],
        },
      });

      // Update the state with the new benchmarkTime
      const updatedData = fetchedData.events.map((event) =>
        event.eventName === modalNodeData.eventName
          ? { ...event, benchmarkTime: parseFloat(benchmarkTimeInput) }
          : event
      );

      this.setState({
        fetchedData: { ...fetchedData, events: updatedData },
        modalNodeData: {
          ...modalNodeData,
          benchmarkTime: parseFloat(benchmarkTimeInput),
        },
      });

      document.getElementById("my_modal_3").close();
    } catch (error) {
      console.error("Error updating benchmark time:", error);
    }
  }

  handleAddNode() {
    const newNode = {
      id: this.state.nodeDataArray.length,
      eventName: this.state.newNodeText,
      color: this.state.newNodeColor,
      shape: this.state.newNodeShape,
      isTextEditable: true,
    };
    this.setState(
      produce((draft) => {
        draft.nodeDataArray.push(newNode);
        draft.skipsDiagramUpdate = false;
      })
    );
  }

  handleAddLink() {
    const newLink = {
      id: -(this.state.linkDataArray.length + 1),
      from: this.state.newLinkFrom,
      to: this.state.newLinkTo,
      text: this.state.newLinkText,
    };
    this.setState(
      produce((draft) => {
        draft.linkDataArray.push(newLink);
        draft.skipsDiagramUpdate = false;
      })
    );
  }

  filterDataForExport(data) {
    const filteredNodeDataArray = data.nodeDataArray.map((node) => {
      const { loc, ...rest } = node;
      return rest;
    });

    return {
      ...data,
      nodeDataArray: filteredNodeDataArray,
    };
  }

  handleExport() {
    const data = {
      nodeDataArray: this.state.nodeDataArray,
      linkDataArray: this.state.linkDataArray,
      modelData: this.state.modelData,
    };
    const filteredData = this.filterDataForExport(data);
    const json = JSON.stringify(filteredData);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "diagram.json");
  }

  handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          const data = JSON.parse(content);
          this.setState(
            produce((draft) => {
              const existingNodeKeys = new Set(
                draft.nodeDataArray.map((node) => node.id)
              );
              data.nodeDataArray.forEach((newNode) => {
                delete newNode.loc; // Remove loc property to allow automatic layout
                const existingNode = draft.nodeDataArray.find(
                  (node) => node.id === newNode.id
                );
                if (existingNode) {
                  const updatedNode = { ...existingNode, ...newNode }; // Create a new object with merged properties
                  const index = draft.nodeDataArray.indexOf(existingNode);
                  draft.nodeDataArray[index] = updatedNode;
                } else {
                  draft.nodeDataArray.push(newNode); // Add new node
                }
              });
              draft.nodeDataArray = draft.nodeDataArray.filter(
                (node) =>
                  existingNodeKeys.has(node.id) ||
                  data.nodeDataArray.find((newNode) => newNode.id === node.id)
              );
              this.refreshNodeIndex(draft.nodeDataArray);

              const existingLinkKeys = new Set(
                draft.linkDataArray.map((link) => link.id)
              );
              data.linkDataArray.forEach((newLink) => {
                const existingLink = draft.linkDataArray.find(
                  (link) => link.id === newLink.id
                );
                if (existingLink) {
                  const updatedLink = { ...existingLink, ...newLink }; // Create a new object with merged properties
                  const index = draft.linkDataArray.indexOf(existingLink);
                  draft.linkDataArray[index] = updatedLink;
                } else {
                  draft.linkDataArray.push(newLink); // Add new link
                }
              });
              draft.linkDataArray = draft.linkDataArray.filter(
                (link) =>
                  existingLinkKeys.has(link.id) ||
                  data.linkDataArray.find((newLink) => newLink.id === link.id)
              );
              this.refreshLinkIndex(draft.linkDataArray);

              draft.modelData = data.modelData;
              draft.skipsDiagramUpdate = false;
              draft.currentFileName = file.name; // Track the loaded file name
            })
          );
        }
      };
      reader.readAsText(file);
    }
  }

  handleSave() {
    const data = {
      nodeDataArray: this.state.nodeDataArray,
      linkDataArray: this.state.linkDataArray,
      modelData: this.state.modelData,
    };
    const filteredData = this.filterDataForExport(data);
    const json = JSON.stringify(filteredData);
    const blob = new Blob([json], { type: "application/json" });
    if (this.state.currentFileName) {
      saveAs(blob, this.state.currentFileName);
    } else {
      saveAs(blob, "diagram.json");
    }
  }

  render() {
    const { loading, selectedData, modalNodeData, benchmarkTimeInput } =
      this.state;
    let inspector;
    if (selectedData !== null) {
      inspector = (
        <SelectionInspector
          selectedData={this.state.selectedData}
          onInputChange={this.handleInputChange}
        />
      );
    }

    if (loading) {
      return (
        <div className="h-screen w-screen flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <div className="h-screen w-screen flex">
        <div className="w-1/4 bg-gray-100 p-6 shadow-lg">
          <div>
            <h3 className="text-xl font-semibold mb-4">Add Node</h3>
            <label className="block mb-3">
              Event Name:
              <input
                type="text"
                value={this.state.newNodeText}
                onChange={(e) => this.setState({ newNodeText: e.target.value })}
                className="input input-bordered w-full mt-1"
              />
            </label>
            <label className="block mb-3">
              Color:
              <select
                value={this.state.newNodeColor}
                onChange={(e) =>
                  this.setState({ newNodeColor: e.target.value })
                }
                className="select select-bordered w-full mt-1"
              >
                {Object.keys(colorMapping).map((color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-3">
              Shape:
              <select
                value={this.state.newNodeShape}
                onChange={(e) =>
                  this.setState({ newNodeShape: e.target.value })
                }
                className="select select-bordered w-full mt-1"
              >
                <option value="RoundedRectangle">Rounded Rectangle</option>
                <option value="Ellipse">Ellipse</option>
                <option value="Triangle">Triangle</option>
              </select>
            </label>
            <button
              onClick={this.handleAddNode}
              className="bg-white text-[#6E8672] border border-[#6E8672] py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#6E8672] hover:text-white font-bold text-sm w-full"
            >
              Add Node
            </button>
          </div>
          <div className="flex flex-row mt-2 mb-4 justify-between">
            <button
              onClick={this.handleExport}
              className="bg-white text-[#6E8672] border border-[#6E8672] py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#6E8672] hover:text-white font-bold text-sm"
            >
              Export Diagram
            </button>
            <label className="bg-white text-[#6E8672] border border-[#6E8672] py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#6E8672] hover:text-white font-bold text-sm cursor-pointer">
              Choose File
              <input
                type="file"
                accept=".json"
                onChange={this.handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <button
            onClick={this.handleReshape}
            className="bg-white text-[#6E8672] border border-[#6E8672] py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#6E8672] hover:text-white font-bold text-sm w-full"
          >
            Reshape Diagram
          </button>
          {inspector}
        </div>
        <div className="flex-1 p-4">
          <div className="diagram-component ">
            <DiagramWrapper
              nodeDataArray={this.state.nodeDataArray}
              linkDataArray={this.state.linkDataArray}
              modelData={this.state.modelData}
              skipsDiagramUpdate={this.state.skipsDiagramUpdate}
              onDiagramEvent={this.handleDiagramEvent}
              onModelChange={this.handleModelChange}
              onShapeClick={this.handleShapeClick}
            />
          </div>
        </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-light text-2xl">Node Information</h3>
            {modalNodeData && (
              <div>
                <p>
                  <strong>Event Name:</strong> {modalNodeData.eventName}
                </p>
                <p>
                  <strong>Frequency:</strong> {modalNodeData.frequency}
                </p>
                <p>
                  <strong>Time:</strong> {modalNodeData.time}
                </p>
                <form onSubmit={this.handleBenchmarkTimeSubmit}>
                  <label>
                    <strong>Benchmark Time:</strong>
                    <input
                      value={benchmarkTimeInput}
                      onChange={this.handleBenchmarkTimeChange}
                      type="text"
                      className="input input-bordered w-full mt-1"
                    />
                  </label>
                  <button
                    type="submit"
                    className="bg-white text-[#6E8672] border border-[#6E8672] py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#6E8672] hover:text-white font-bold text-sm w-full mt-2"
                  >
                    Submit
                  </button>
                </form>
                {/* Display other data as needed */}
              </div>
            )}
          </div>
        </dialog>
      </div>
    );
  }
}

export default App;
