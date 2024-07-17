/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import React from "react";

import { GuidedDraggingTool } from "./GuidedDraggingTool";

import "../../styles/Diagram.css";

class DiagramWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.diagramRef = React.createRef();
  }

  diagramStyle = { backgroundColor: "white" };

  componentDidMount() {
    if (!this.diagramRef.current) return;
    const diagram = this.diagramRef.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.addDiagramListener("ChangedSelection", this.props.onDiagramEvent);

      // Add listener for object single click
      diagram.addDiagramListener("ObjectSingleClicked", (e) => {
        const part = e.subject.part;
        if (part instanceof go.Node) {
          const shape = part.findObject("SHAPE");
          if (shape && shape.figure === "RoundedRectangle") {
            this.props.onShapeClick(part.data);
          }
        }
      });
    }
  }

  componentWillUnmount() {
    if (!this.diagramRef.current) return;
    const diagram = this.diagramRef.current.getDiagram();
    if (diagram instanceof go.Diagram) {
      diagram.removeDiagramListener(
        "ChangedSelection",
        this.props.onDiagramEvent
      );
    }
  }

  initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
      "undoManager.isEnabled": true,
      draggingTool: new GuidedDraggingTool(),
      "draggingTool.horizontalGuidelineColor": "blue",
      "draggingTool.verticalGuidelineColor": "blue",
      "draggingTool.centerGuidelineColor": "green",
      "draggingTool.guidelineWidth": 1,
      layout: $(go.ForceDirectedLayout, {
        defaultSpringLength: 200, // The natural length of the springs (increased for more spacing)
        defaultElectricalCharge: 100, // The electrical charge of each node (increased for more repulsion)
        maxIterations: 1000, // Maximum number of iterations (to allow for better convergence)
        infinityDistance: 2000, // Distance beyond which forces are not considered (helps prevent infinite repulsion)
        // arrangement: go.ForceDirectedLayout.ArrangementNone, // No predefined arrangement
      }),
      model: $(go.GraphLinksModel, {
        nodeKeyProperty: "id",
        linkKeyProperty: "id",
        makeUniqueKeyFunction: (m, data) => {
          let k = data.id || 1;
          while (m.findNodeDataForKey(k)) k++;
          data.id = k;
          return k;
        },
        makeUniqueLinkKeyFunction: (m, data) => {
          let k = data.id || -1;
          while (m.findLinkDataForKey(k)) k--;
          data.id = k;
          return k;
        },
      }),
    });

    const textBlockFontConverter = (shape) => {
      return shape === "RoundedRectangle"
        ? ".875rem Roboto, sans-serif"
        : "bold .875rem Roboto, sans-serif";
    };

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      new go.Binding("location", "loc", (loc) =>
        loc ? go.Point.parse(loc) : new go.Point(0, 0)
      ).makeTwoWay(go.Point.stringify),
      $(
        go.Shape,
        "RoundedRectangle",
        {
          name: "SHAPE",
          fill: "white",
          strokeWidth: 0,
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          cursor: "pointer",
        },
        new go.Binding("figure", "shape"),
        new go.Binding("fill", "color")
      ),
      $(
        go.TextBlock,
        { margin: 8 },
        new go.Binding("text", "eventName").makeTwoWay(),
        new go.Binding("editable", "isTextEditable"),
        new go.Binding("font", "shape", textBlockFontConverter)
      )
    );

    diagram.linkTemplate = $(
      go.Link,
      {
        curve: go.Link.Bezier,
        relinkableFrom: true,
        relinkableTo: true,
      },
      new go.Binding("relinkableFrom", "canRelink").ofModel(),
      new go.Binding("relinkableTo", "canRelink").ofModel(),
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" }),
      $(
        go.TextBlock,
        { segmentOffset: new go.Point(0, -10), editable: true },
        new go.Binding("text", "text").makeTwoWay()
      )
    );

    return diagram;
  }

  render() {
    return (
      <ReactDiagram
        ref={this.diagramRef}
        divClassName="diagram-component"
        style={this.diagramStyle}
        initDiagram={() => this.initDiagram()}
        nodeDataArray={this.props.nodeDataArray}
        linkDataArray={this.props.linkDataArray}
        modelData={this.props.modelData}
        onModelChange={this.props.onModelChange}
        skipsDiagramUpdate={this.props.skipsDiagramUpdate}
      />
    );
  }
}

export { DiagramWrapper };
