import * as go from "gojs";

export class GuidedDraggingTool extends go.DraggingTool {
  // horizontal guidelines
  guidelineHtop;
  guidelineHbottom;
  guidelineHcenter;
  // vertical guidelines
  guidelineVleft;
  guidelineVright;
  guidelineVcenter;

  // properties that the programmer can modify
  _guidelineSnapDistance = 6;
  _isGuidelineEnabled = true;
  _horizontalGuidelineColor = "gray";
  _verticalGuidelineColor = "gray";
  _centerGuidelineColor = "gray";
  _guidelineWidth = 1;
  _searchDistance = 1000;
  _isGuidelineSnapEnabled = true;

  constructor() {
    super();

    const partProperties = { layerName: "Tool", isInDocumentBounds: false };
    const shapeProperties = { stroke: "gray", isGeometryPositioned: true };

    const $ = go.GraphObject.make;

    this.guidelineHtop = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" })
    );
    this.guidelineHbottom = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" })
    );
    this.guidelineHcenter = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 100 0" })
    );

    this.guidelineVleft = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" })
    );
    this.guidelineVright = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" })
    );
    this.guidelineVcenter = $(
      go.Part,
      partProperties,
      $(go.Shape, shapeProperties, { geometryString: "M0 0 0 100" })
    );
  }

  get guidelineSnapDistance() {
    return this._guidelineSnapDistance;
  }
  set guidelineSnapDistance(val) {
    if (typeof val !== "number" || isNaN(val) || val < 0)
      throw new Error(
        "new value for GuidedDraggingTool.guidelineSnapDistance must be a non-negative number"
      );
    if (this._guidelineSnapDistance !== val) {
      this._guidelineSnapDistance = val;
    }
  }

  get isGuidelineEnabled() {
    return this._isGuidelineEnabled;
  }
  set isGuidelineEnabled(val) {
    if (typeof val !== "boolean")
      throw new Error(
        "new value for GuidedDraggingTool.isGuidelineEnabled must be a boolean value."
      );
    if (this._isGuidelineEnabled !== val) {
      this._isGuidelineEnabled = val;
    }
  }

  get horizontalGuidelineColor() {
    return this._horizontalGuidelineColor;
  }
  set horizontalGuidelineColor(val) {
    if (this._horizontalGuidelineColor !== val) {
      this._horizontalGuidelineColor = val;
      this.guidelineHbottom.elements.first().stroke =
        this._horizontalGuidelineColor;
      this.guidelineHtop.elements.first().stroke =
        this._horizontalGuidelineColor;
    }
  }

  get verticalGuidelineColor() {
    return this._verticalGuidelineColor;
  }
  set verticalGuidelineColor(val) {
    if (this._verticalGuidelineColor !== val) {
      this._verticalGuidelineColor = val;
      this.guidelineVleft.elements.first().stroke =
        this._verticalGuidelineColor;
      this.guidelineVright.elements.first().stroke =
        this._verticalGuidelineColor;
    }
  }

  get centerGuidelineColor() {
    return this._centerGuidelineColor;
  }
  set centerGuidelineColor(val) {
    if (this._centerGuidelineColor !== val) {
      this._centerGuidelineColor = val;
      this.guidelineVcenter.elements.first().stroke =
        this._centerGuidelineColor;
      this.guidelineHcenter.elements.first().stroke =
        this._centerGuidelineColor;
    }
  }

  get guidelineWidth() {
    return this._guidelineWidth;
  }
  set guidelineWidth(val) {
    if (typeof val !== "number" || isNaN(val) || val < 0)
      throw new Error(
        "New value for GuidedDraggingTool.guidelineWidth must be a non-negative number."
      );
    if (this._guidelineWidth !== val) {
      this._guidelineWidth = val;
      this.guidelineVcenter.elements.first().strokeWidth = val;
      this.guidelineHcenter.elements.first().strokeWidth = val;
      this.guidelineVleft.elements.first().strokeWidth = val;
      this.guidelineVright.elements.first().strokeWidth = val;
      this.guidelineHbottom.elements.first().strokeWidth = val;
      this.guidelineHtop.elements.first().strokeWidth = val;
    }
  }

  get searchDistance() {
    return this._searchDistance;
  }
  set searchDistance(val) {
    if (typeof val !== "number" || isNaN(val) || val <= 0)
      throw new Error(
        "new value for GuidedDraggingTool.searchDistance must be a positive number."
      );
    if (this._searchDistance !== val) {
      this._searchDistance = val;
    }
  }

  get isGuidelineSnapEnabled() {
    return this._isGuidelineSnapEnabled;
  }
  set isGuidelineSnapEnabled(val) {
    if (typeof val !== "boolean")
      throw new Error(
        "new value for GuidedDraggingTool.isGuidelineSnapEnabled must be a boolean."
      );
    if (this._isGuidelineSnapEnabled !== val) {
      this._isGuidelineSnapEnabled = val;
    }
  }

  clearGuidelines() {
    this.diagram.remove(this.guidelineHbottom);
    this.diagram.remove(this.guidelineHcenter);
    this.diagram.remove(this.guidelineHtop);
    this.diagram.remove(this.guidelineVleft);
    this.diagram.remove(this.guidelineVright);
    this.diagram.remove(this.guidelineVcenter);
  }

  doDeactivate() {
    super.doDeactivate();
    this.clearGuidelines();
  }

  doDragOver(_pt, _obj) {
    this.clearGuidelines();

    const draggingParts = this.copiedParts || this.draggedParts;
    if (draggingParts === null) return;
    const partItr = draggingParts.iterator;
    if (partItr.next()) {
      const part = partItr.key;

      this.showHorizontalMatches(part, this.isGuidelineEnabled, false);
      this.showVerticalMatches(part, this.isGuidelineEnabled, false);
    }
  }

  doDropOnto(_pt, _obj) {
    this.clearGuidelines();

    // gets the selected (perhaps copied) Part
    const draggingParts = this.copiedParts || this.draggedParts;
    if (draggingParts === null) return;
    const partItr = draggingParts.iterator;
    if (partItr.next()) {
      const part = partItr.key;

      // snaps only when the mouse is released without shift modifier
      const e = this.diagram.lastInput;
      const snap = this.isGuidelineSnapEnabled && !e.shift;

      this.showHorizontalMatches(part, false, snap); // false means don't show guidelines
      this.showVerticalMatches(part, false, snap);
    }
  }

  invalidateLinks(node) {
    if (node instanceof go.Node) node.invalidateConnectedLinks();
  }

  showHorizontalMatches(part, guideline, snap) {
    const objBounds = part.locationObject.getDocumentBounds();
    const p0 = objBounds.y;
    const p1 = objBounds.y + objBounds.height / 2;
    const p2 = objBounds.y + objBounds.height;

    const marginOfError = this.guidelineSnapDistance;
    const distance = this.searchDistance;
    // compares with parts within narrow vertical area
    const area = objBounds.copy();
    area.inflate(distance, marginOfError + 1);
    const otherObjs = this.diagram?.findObjectsIn(
      area,
      (obj) => obj.part,
      (p) =>
        p instanceof go.Part &&
        !p.isSelected &&
        !(p instanceof go.Link) &&
        p.isTopLevel &&
        p.layer !== null &&
        !p.layer.isTemporary,
      true
    );

    let bestDiff = marginOfError;
    let bestObj = null;
    let bestSpot = go.Spot.Default;
    let bestOtherSpot = go.Spot.Default;

    otherObjs.each((other) => {
      if (other === part) return; // ignore itself

      const otherBounds = other.locationObject.getDocumentBounds();
      const q0 = otherBounds.y;
      const q1 = otherBounds.y + otherBounds.height / 2;
      const q2 = otherBounds.y + otherBounds.height;

      // compare center with center of OTHER part
      if (Math.abs(p1 - q1) < bestDiff) {
        bestDiff = Math.abs(p1 - q1);
        bestObj = other;
        bestSpot = go.Spot.Center;
        bestOtherSpot = go.Spot.Center;
      }
      // compare top side with top and bottom sides of OTHER part
      if (Math.abs(p0 - q0) < bestDiff) {
        bestDiff = Math.abs(p0 - q0);
        bestObj = other;
        bestSpot = go.Spot.Top;
        bestOtherSpot = go.Spot.Top;
      } else if (Math.abs(p0 - q2) < bestDiff) {
        bestDiff = Math.abs(p0 - q2);
        bestObj = other;
        bestSpot = go.Spot.Top;
        bestOtherSpot = go.Spot.Bottom;
      }
      // compare bottom side with top and bottom sides of OTHER part
      if (Math.abs(p2 - q0) < bestDiff) {
        bestDiff = Math.abs(p2 - q0);
        bestObj = other;
        bestSpot = go.Spot.Bottom;
        bestOtherSpot = go.Spot.Top;
      } else if (Math.abs(p2 - q2) < bestDiff) {
        bestDiff = Math.abs(p2 - q2);
        bestObj = other;
        bestSpot = go.Spot.Bottom;
        bestOtherSpot = go.Spot.Bottom;
      }
    });

    if (bestObj !== null) {
      const offsetX = objBounds.x - part.actualBounds.x;
      const offsetY = objBounds.y - part.actualBounds.y;
      const bestBounds = bestObj.locationObject.getDocumentBounds();
      // line extends from x0 to x2
      const x0 = Math.min(objBounds.x, bestBounds.x) - 10;
      const x2 =
        Math.max(
          objBounds.x + objBounds.width,
          bestBounds.x + bestBounds.width
        ) + 10;
      // find bestObj's desired Y
      const bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
      if (bestSpot === go.Spot.Center) {
        if (snap) {
          // call Part.move in order to automatically move member Parts of Groups
          part.move(
            new go.Point(
              objBounds.x - offsetX,
              bestPoint.y - objBounds.height / 2 - offsetY
            )
          );
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineHcenter.position = new go.Point(x0, bestPoint.y);
          this.guidelineHcenter.elt(0).width = x2 - x0;
          this.diagram.add(this.guidelineHcenter);
        }
      } else if (bestSpot === go.Spot.Top) {
        if (snap) {
          part.move(new go.Point(objBounds.x - offsetX, bestPoint.y - offsetY));
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineHtop.position = new go.Point(x0, bestPoint.y);
          this.guidelineHtop.elt(0).width = x2 - x0;
          this.diagram.add(this.guidelineHtop);
        }
      } else if (bestSpot === go.Spot.Bottom) {
        if (snap) {
          part.move(
            new go.Point(
              objBounds.x - offsetX,
              bestPoint.y - objBounds.height - offsetY
            )
          );
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineHbottom.position = new go.Point(x0, bestPoint.y);
          this.guidelineHbottom.elt(0).width = x2 - x0;
          this.diagram.add(this.guidelineHbottom);
        }
      }
    }
  }

  showVerticalMatches(part, guideline, snap) {
    const objBounds = part.locationObject.getDocumentBounds();
    const p0 = objBounds.x;
    const p1 = objBounds.x + objBounds.width / 2;
    const p2 = objBounds.x + objBounds.width;

    const marginOfError = this.guidelineSnapDistance;
    const distance = this.searchDistance;
    // compares with parts within narrow vertical area
    const area = objBounds.copy();
    area.inflate(marginOfError + 1, distance);
    const otherObjs = this.diagram.findObjectsIn(
      area,
      (obj) => obj.part,
      (p) =>
        p instanceof go.Part &&
        !p.isSelected &&
        !(p instanceof go.Link) &&
        p.isTopLevel &&
        p.layer !== null &&
        !p.layer.isTemporary,
      true
    );

    let bestDiff = marginOfError;
    let bestObj = null;
    let bestSpot = go.Spot.Default;
    let bestOtherSpot = go.Spot.Default;
    // vertical line -- comparing x-values
    otherObjs.each((other) => {
      if (other === part) return; // ignore itself

      const otherBounds = other.locationObject.getDocumentBounds();
      const q0 = otherBounds.x;
      const q1 = otherBounds.x + otherBounds.width / 2;
      const q2 = otherBounds.x + otherBounds.width;

      // compare center with center of OTHER part
      if (Math.abs(p1 - q1) < bestDiff) {
        bestDiff = Math.abs(p1 - q1);
        bestObj = other;
        bestSpot = go.Spot.Center;
        bestOtherSpot = go.Spot.Center;
      }
      // compare left side with left and right sides of OTHER part
      if (Math.abs(p0 - q0) < bestDiff) {
        bestDiff = Math.abs(p0 - q0);
        bestObj = other;
        bestSpot = go.Spot.Left;
        bestOtherSpot = go.Spot.Left;
      } else if (Math.abs(p0 - q2) < bestDiff) {
        bestDiff = Math.abs(p0 - q2);
        bestObj = other;
        bestSpot = go.Spot.Left;
        bestOtherSpot = go.Spot.Right;
      }
      // compare right side with left and right sides of OTHER part
      if (Math.abs(p2 - q0) < bestDiff) {
        bestDiff = Math.abs(p2 - q0);
        bestObj = other;
        bestSpot = go.Spot.Right;
        bestOtherSpot = go.Spot.Left;
      } else if (Math.abs(p2 - q2) < bestDiff) {
        bestDiff = Math.abs(p2 - q2);
        bestObj = other;
        bestSpot = go.Spot.Right;
        bestOtherSpot = go.Spot.Right;
      }
    });

    if (bestObj !== null) {
      const offsetX = objBounds.x - part.actualBounds.x;
      const offsetY = objBounds.y - part.actualBounds.y;
      const bestBounds = bestObj.locationObject.getDocumentBounds();
      // line extends from y0 to y2
      const y0 = Math.min(objBounds.y, bestBounds.y) - 10;
      const y2 =
        Math.max(
          objBounds.y + objBounds.height,
          bestBounds.y + bestBounds.height
        ) + 10;
      // find bestObj's desired X
      const bestPoint = new go.Point().setRectSpot(bestBounds, bestOtherSpot);
      if (bestSpot === go.Spot.Center) {
        if (snap) {
          // call Part.move in order to automatically move member Parts of Groups
          part.move(
            new go.Point(
              bestPoint.x - objBounds.width / 2 - offsetX,
              objBounds.y - offsetY
            )
          );
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineVcenter.position = new go.Point(bestPoint.x, y0);
          this.guidelineVcenter.elt(0).height = y2 - y0;
          this.diagram.add(this.guidelineVcenter);
        }
      } else if (bestSpot === go.Spot.Left) {
        if (snap) {
          part.move(new go.Point(bestPoint.x - offsetX, objBounds.y - offsetY));
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineVleft.position = new go.Point(bestPoint.x, y0);
          this.guidelineVleft.elt(0).height = y2 - y0;
          this.diagram.add(this.guidelineVleft);
        }
      } else if (bestSpot === go.Spot.Right) {
        if (snap) {
          part.move(
            new go.Point(
              bestPoint.x - objBounds.width - offsetX,
              objBounds.y - offsetY
            )
          );
          this.invalidateLinks(part);
        }
        if (guideline) {
          this.guidelineVright.position = new go.Point(bestPoint.x, y0);
          this.guidelineVright.elt(0).height = y2 - y0;
          this.diagram.add(this.guidelineVright);
        }
      }
    }
  }
}
