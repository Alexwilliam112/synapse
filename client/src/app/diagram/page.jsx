/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
"use client";
import * as go from "gojs";
import { produce } from "immer";
import React from "react";
import { saveAs } from "file-saver";

import { DiagramWrapper } from "../../components/diagram/DiagramWrapper";
import { SelectionInspector } from "../../components/diagram/SelectionInspector";

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
  handleShapeClick = (shape) => {
    if (shape === "RoundedRectangle") {
      document.getElementById("my_modal_3").showModal();
    }
  };

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
                  Object.assign(existingNode, newNode); // Update existing node
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
                  Object.assign(existingLink, newLink); // Update existing link
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

  // handleReshape() {
  //   // Implementing the reshaping functionality
  //   const diagram = this.diagramRef.current.getDiagram();
  //   if (diagram instanceof go.Diagram) {
  //     diagram.layoutDiagram(true); // This will reshape the diagram according to the specified layout
  //   }
  // }

  render() {
    const selectedData = this.state.selectedData;
    let inspector;
    if (selectedData !== null) {
      inspector = (
        <SelectionInspector
          selectedData={this.state.selectedData}
          onInputChange={this.handleInputChange}
        />
      );
    }

    return (
      <div className="h-screen w-screen flex flex-1 flex-row">
        <div className=" p-4">
          <div>
            <h3>Add Node</h3>
            <label>
              Event Name:
              <input
                type="text"
                value={this.state.newNodeText}
                onChange={(e) => this.setState({ newNodeText: e.target.value })}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label>
              Color:
              <select
                value={this.state.newNodeColor}
                onChange={(e) =>
                  this.setState({ newNodeColor: e.target.value })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option value="lightblue">Light Blue</option>
                <option value="orange">Orange</option>
                <option value="lightgreen">Light Green</option>
                <option value="pink">Pink</option>
                <option value="yellow">Yellow</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="gray">Gray</option>
              </select>
            </label>
            <label>
              Shape:
              <select
                value={this.state.newNodeShape}
                onChange={(e) =>
                  this.setState({ newNodeShape: e.target.value })
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option value="RoundedRectangle">Rounded Rectangle</option>
                <option value="Ellipse">Ellipse</option>
                <option value="Triangle">Triangle</option>
              </select>
            </label>
            <button
              onClick={this.handleAddNode}
              className="btn btn-success w-full max-w-xs mx-2 my-2"
            >
              Add Node
            </button>
          </div>
          {/* <div>
            <h3>Add Link</h3>
            <label>
              Text:
              <input
                type="text"
                value={this.state.newLinkText}
                onChange={(e) => this.setState({ newLinkText: e.target.value })}
              />
            </label>
            <label>
              From Node:
              <select
                value={this.state.newLinkFrom}
                onChange={(e) =>
                  this.setState({ newLinkFrom: parseInt(e.target.value) })
                }
              >
                {this.state.nodeDataArray.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.eventName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              To Node:
              <select
                value={this.state.newLinkTo}
                onChange={(e) =>
                  this.setState({ newLinkTo: parseInt(e.target.value) })
                }
              >
                {this.state.nodeDataArray.map((node) => (
                  <option key={node.id} value={node.id}>
                    {node.eventName}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={this.handleAddLink}>Add Link</button>
          </div> */}
          <div className="flex flex-wrap">
            <button
              onClick={this.handleExport}
              className="btn btn-success mx-2 my-2"
            >
              Export Diagram
            </button>
            {/* <button onClick={this.handleSave}>Save Diagram</button> */}
            <label className="btn btn-success mx-2 my-2">
              Choose File
              <input
                type="file"
                accept=".json"
                onChange={this.handleFileChange}
                style={{ display: "none" }} // Hide the default file input
              />
            </label>
            <button onClick={this.handleReshape} className="btn btn-warning">
              Reshape Diagram
            </button>
          </div>
          <label>
            Allow Relinking?
            <input
              type="checkbox"
              id="relink"
              checked={this.state.modelData.canRelink}
              onChange={this.handleRelinkChange}
            />
          </label>
          {inspector}
        </div>
        <div className="p-4">
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
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    );
  }
}

export default App;
