/*
 *  Copyright (C) 1998-2024 by Northwoods Software Corporation. All Rights Reserved.
 */
"use client";
import React from "react";
import { InspectorRow } from "./InspectorRow";
import "../../styles/inspector.css";

export class SelectionInspector extends React.PureComponent {
  renderObjectDetails() {
    const selObj = this.props.selectedData;
    const dets = [];
    for (const k in selObj) {
      const val = selObj[k];
      const row = (
        <InspectorRow
          key={k}
          id={k}
          value={val}
          onInputChange={this.props.onInputChange}
        />
      );
      if (k === "key") {
        dets.unshift(row); // key always at start
      } else {
        dets.push(row);
      }
    }
    return dets;
  }

  render() {
    return (
      <div id="myInspectorDiv" className="inspector">
        <table>
          <tbody>{this.renderObjectDetails()}</tbody>
        </table>
      </div>
    );
  }
}
