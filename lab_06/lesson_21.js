function Point(x, y) {
  this.combine = function(point) {
    return new Point(x + point.getX(), y + point.getY());
  };

  this.clone = function() {
    return Point(x, y);
  };

  this.update = function(point) {
    x += point.getX();
    y += point.getY();
  };

  this.multiply = function(value) {
    x *= value;
    y *= value;
  };

  this.getX = function() {
    return x;
  };

  this.setX = function(value) {
    x = value;
  };

  this.getY = function() {
    return y;
  };

  this.setY = function(value) {
    y = value;
  };
}

const CONTAINER_TYPE = {
  vertical: "vertical-container",
  horizontal: "horizontal-container"
};

function Container(type) {
  let root = document.createElement("div");

  root.classList.add(type);
  root.classList.add("container-component");

  this.addElement = function(element) {
    root.appendChild(element);
  };

  this.removeElement = function(element) {
    root.removeChild(element);
  };

  this.render = function() {
    return root;
  };
}

const INPUT_TYPE = {
  text: "text",
  number: "number"
};

function Input(label, type) {
  let root = document.createElement("div");
  let input = document.createElement("input");

  input.classList.add("input");
  input.type = type;
  input.placeholder = label;
  root.appendChild(input);

  this.render = function() {
    return root;
  };

  this.value = function() {
    return input.value;
  };
}

function ColorChecker() {
  let root = document.createElement("div");
  let input = document.createElement("input");

  input.type = "color";
  root.classList.add("box");
  root.classList.add("color-picker");
  root.appendChild(input);

  this.render = function() {
    return root;
  };

  this.value = function() {
    return input.value;
  };
}

const BUTTON_TYPE = {
  round: "rounded",
  rectangle: "rectangled"
};

function Button(event, type, icon) {
  let button = document.createElement("button");

  button.classList.add("button");
  button.classList.add(type);
  button.appendChild(icon.render());
  button.addEventListener("click", event);

  this.action = function() {
    event();
  };

  this.render = function() {
    return button;
  };
}

function Icon(icon) {
  let root = document.createElement("img");

  root.setAttribute("src", icon.url);
  root.setAttribute("width", icon.size);
  root.setAttribute("height", icon.size);

  this.render = function() {
    return root.cloneNode(true);
  };
}

const RAW_ICONS = {
  plus: {
    url: "resources/svg/plus_3.svg",
    size: "16"
  },
  minus: {
    url: "resources/svg/minus_3.svg",
    size: "16"
  },
  clear: {
    url: "resources/svg/clear_1.svg",
    size: "16"
  },
  confirm: {
    url: "resources/svg/check_1.svg",
    size: "16"
  }
};

const ICONS = {
  plus: new Icon(RAW_ICONS.plus),
  minus: new Icon(RAW_ICONS.minus),
  clear: new Icon(RAW_ICONS.clear),
  confirm: new Icon(RAW_ICONS.confirm)
};

function Expression(code) {
  formatedCode = `return ${code} ;`;

  let expression = new Function("x", formatedCode);

  this.substitute = function(arg) {
    try {
      return expression(arg);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

function View(width, height) {
  let root = document.createElement("div");
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  let self = this;

  canvas.width = width;
  canvas.height = height;
  root.appendChild(canvas);

  root.classList.add("box");
  root.classList.add("view");

  function drawLine(x1, y1, x2, y2, width, color) {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  this.drawLineByPoints = function(p1, p2, width, color) {
    drawLine(p1.getX(), p1.getY(), p2.getX(), p2.getY(), width, color);
  };

  this.drawLineByCoords = drawLine;

  this.clear = function() {
    context.clearRect(0, 0, self.getWidth(), self.getHeight());
  };

  this.resize = function(width, height) {
    canvas.width = width;
    canvas.height = height;
  };

  this.getWidth = function() {
    return canvas.width;
  };

  this.getHeight = function() {
    return canvas.height;
  };

  this.render = function() {
    return root;
  };
}

function TransformationData() {
  let offset = new Point(0, 0);
  let scale = 1;

  this.setScale = function(value) {
    if (value <= 0) return;
    scale = value;
  };

  this.updateScale = function(value) {
    scale += value;
    if (scale <= 0) scale = 1;
  };

  this.getScale = function() {
    return scale;
  };

  this.setOffset = function(value) {
    offset = value;
  };

  this.updateOffset = function(point) {
    offset.update(point);
  };

  this.getOffset = function() {
    return offset;
  };
}

function truncate(minValue, value, maxValue) {
  if (value < minValue) return minValue;
  return value > maxValue ? maxValue : value;
}

function Grid() {
  let axisWidth = 1.2;
  let regularWidth = 0.5;
  let subWidth = 0.2;

  let axisColor = "#3f3f3f";
  let regualrColor = "#2a3a4a";
  let subColor = "#6f4f2f";

  function drawVerticalLines(view, spacing, width, color) {
    let line = {
      startY: 0,
      endY: view.getHeight(),
      x: view.getWidth() / 2
    };

    for (; line.x <= view.getWidth(); line.x += spacing) {
      view.drawLineByCoords(
        line.x,
        line.startY,
        line.x,
        line.endY,
        width,
        color
      );
    }

    line.x = view.getWidth() / 2 - spacing;

    for (; line.x >= 0; line.x -= spacing) {
      view.drawLineByCoords(
        line.x,
        line.startY,
        line.x,
        line.endY,
        width,
        color
      );
    }
  }

  function drawHorizontalLines(view, spacing, width, color) {
    let line = {
      startX: 0,
      endX: view.getWidth(),
      y: view.getHeight() / 2
    };

    for (; line.y <= view.getHeight(); line.y += spacing) {
      view.drawLineByCoords(
        line.startX,
        line.y,
        line.endX,
        line.y,
        width,
        color
      );
    }

    line.y = view.getHeight() / 2 - spacing;

    for (; line.y >= 0; line.y -= spacing) {
      view.drawLineByCoords(
        line.startX,
        line.y,
        line.endX,
        line.y,
        width,
        color
      );
    }
  }

  function drawAxis(transform, view) {
    let width = {
      vertical: axisWidth,
      horizontal: axisWidth
    };

    let verticalLine = {
      startY: 0,
      endY: view.getHeight(),
      x: view.getWidth() / 2 + transform.getOffset().getX()
    };

    let horizontalLine = {
      startX: 0,
      endX: view.getWidth(),
      y: view.getWidth() / 2 + transform.getOffset().getY()
    };

    verticalLine.x = truncate(0, verticalLine.x, view.getWidth());
    horizontalLine.y = truncate(0, horizontalLine.y, view.getHeight());

    if (verticalLine.x == 0 || verticalLine.x == view.getWidth())
      width.vertical += 4;
    if (horizontalLine.y == 0 || horizontalLine.y == view.getHeight())
      width.horizontal += 4;

    view.drawLineByCoords(
      verticalLine.x,
      verticalLine.startY,
      verticalLine.x,
      verticalLine.endY,
      width.vertical,
      axisColor
    );
    view.drawLineByCoords(
      horizontalLine.startX,
      horizontalLine.y,
      horizontalLine.endX,
      horizontalLine.y,
      width.horizontal,
      axisColor
    );
  }

  function draw(transform, view) {
    drawVerticalLines(view, 10, subWidth, subColor);
    drawVerticalLines(view, 50, regularWidth, regualrColor);

    drawHorizontalLines(view, 10, subWidth, subColor);
    drawHorizontalLines(view, 50, subWidth, regualrColor);

    drawAxis(transform, view);
  }

  this.draw = function(transform, view) {
    requestAnimationFrame(() => {
      draw(transform, view);
    });
  };

  this.getAxisWidth = function() {
    return axisWidth;
  };

  this.setAxisWidth = function(value) {
    axisWidth = value;
  };

  this.getRegularWidth = function() {
    return regularWidth;
  };

  this.setRegularWidth = function(value) {
    regularWidth = value;
  };

  this.getSubWidth = function() {
    return subWidth;
  };

  this.setSubWidth = function(value) {
    subWidth = value;
  };

  this.getAxisColor = function() {
    return axisColor;
  };

  this.setAxisColor = function(value) {
    axisColor = value;
  };

  this.getRegularColor = function() {
    return regualrColor;
  };

  this.setRegularColor = function(value) {
    regualrColor = value;
  };

  this.getSubColor = function() {
    return subColor;
  };

  this.setSubColor = function(value) {
    subColor = value;
  };
}

function MathFunction(expression, color) {
  this.getColor = function() {
    return color;
  };

  this.setColor = function(value) {
    color = value;
  };

  /** TODO: Don't draw a line over canvas border */
  function draw(transform, view) {
    let offset = new Point(view.getWidth() / 2, view.getHeight() / 2);

    offset.update(transform.getOffset());

    let smooth = 1 / transform.getScale();
    let bounds = {
      min: -view.getWidth() / 2 - transform.getOffset().getX(),
      max: view.getWidth() / 2 - transform.getOffset().getX()
    };
    let startPoint = null;

    for (i = bounds.min; i <= bounds.max; i += smooth) {
      let ordinate = expression.substitute(i);

      if (isNaN(ordinate)) {
        startPoint = null;
        continue;
      }

      let endPoint = new Point(i, -ordinate);

      endPoint.multiply(transform.getScale());
      endPoint.update(offset);

      if (startPoint === null) {
        startPoint = endPoint;
        continue;
      }

      view.drawLineByPoints(startPoint, endPoint, 1.5, color);

      startPoint = endPoint;
    }
  }

  this.draw = function(transform, view) {
    requestAnimationFrame(() => {
      draw(transform, view);
    });
  };
}

function FunctionViewer(width, height) {
  let view = new View(width, height);
  let transform = new TransformationData();
  let functions = new Map();
  let grids = new Map();

  this.addFunction = function(name, mathFunction) {
    functions.set(name, mathFunction);
  };

  this.removeFunction = function(name) {
    return functions.delete(name);
  };

  this.removeAllFunctions = function() {
    functions.clear();
  };

  this.addGrid = function(name, grid) {
    grids.set(name, grid);
  };

  this.removeGrid = function(name) {
    return grids.delete(name);
  };

  let drawGrids = function() {
    grids.forEach(grid => {
      grid.draw(transform, view);
    });
  };

  let drawFunctions = function() {
    functions.forEach(mathFunction => {
      mathFunction.draw(transform, view);
    });
  };

  this.redraw = function() {
    view.clear();
    drawGrids();
    drawFunctions();
  };

  this.getView = function() {
    return view;
  };

  this.getTransform = function() {
    return transform;
  };
}

function ScaleControl(viewer) {
  let container = new Container(CONTAINER_TYPE.horizontal);
  let upScaleButton = new Button(upScale, BUTTON_TYPE.round, ICONS.plus);
  let downScaleButton = new Button(downScale, BUTTON_TYPE.round, ICONS.minus);

  container.render().classList.add("box");

  function upScale() {
    viewer.getTransform().updateScale(5);
    viewer.redraw();
  }

  function downScale() {
    viewer.getTransform().updateScale(-5);
    viewer.redraw();
  }

  container.addElement(upScaleButton.render());
  container.addElement(downScaleButton.render());

  this.getContainer = function() {
    return container;
  };
}

function ClearControl(viewer) {
  let clearButton = new Button(clear, BUTTON_TYPE.round, ICONS.clear);

  function clear() {
    viewer.removeAllFunctions();
    viewer.redraw();
  }

  this.getClearButton = function() {
    return clearButton;
  };
}

function BuilderControl(viewer) {
  let mainContainer = new Container(CONTAINER_TYPE.vertical);
  let secondContainer = new Container(CONTAINER_TYPE.horizontal);

  let inputCode = new Input("expression", INPUT_TYPE.text);
  let inputName = new Input("name", INPUT_TYPE.text);
  let confirm = new Button(build, BUTTON_TYPE.round, ICONS.confirm);
  let colorPicker = new ColorChecker();

  secondContainer.addElement(colorPicker.render());
  secondContainer.addElement(confirm.render());

  mainContainer.addElement(inputCode.render());
  mainContainer.addElement(inputName.render());
  mainContainer.addElement(secondContainer.render());

  mainContainer.render().classList.add("box");

  // TODO: Check input value
  function build() {
    let expression = new Expression(inputCode.value());
    let mathFunction = new MathFunction(expression, colorPicker.value());

    viewer.addFunction(inputName.value(), mathFunction);
    viewer.redraw();
  }

  this.getContainer = function() {
    return mainContainer;
  };
}

function PositionControl(viewer) {
  let container = new Container(CONTAINER_TYPE.horizontal);
  let inputX = new Input("x", INPUT_TYPE.number);
  let inputY = new Input("y", INPUT_TYPE.number);
  let confirm = new Button(updatePosition, BUTTON_TYPE.round, ICONS.confirm);

  container.addElement(inputX.render());
  container.addElement(inputY.render());
  container.addElement(confirm.render());

  container.render().classList.add("box");

  function updatePosition() {
    let offset = new Point(-parseInt(inputX.value()), parseInt(inputY.value()));

    viewer.getTransform().setOffset(offset);
    viewer.redraw();
  }

  this.getContainer = function() {
    return container;
  };
}

function Controls(viewer) {
  let scaleControl = new ScaleControl(viewer);
  let clearControl = new ClearControl(viewer);
  let builderControl = new BuilderControl(viewer);
  let positionControl = new PositionControl(viewer);

  this.getScaleControl = function() {
    return scaleControl;
  };

  this.getClearControl = function() {
    return clearControl;
  };

  this.getBuilderControl = function() {
    return builderControl;
  };

  this.getPositionControl = function() {
    return positionControl;
  };
}

function Application() {
  let viewer = new FunctionViewer(500, 500);
  let controls = new Controls(viewer);

  this.getViewer = function() {
    return viewer;
  };

  this.getControls = function() {
    return controls;
  };
}

function getExpression() {
  return new Expression("x*x");
}

function initializeApplication() {
  let expression = getExpression();

  let viewSide = document.querySelector("#view-side");
  let toolSide = document.querySelector("#tool-side");

  let app = new Application();

  viewSide.appendChild(
    app
      .getViewer()
      .getView()
      .render()
  );

  toolSide.appendChild(
    app
      .getControls()
      .getScaleControl()
      .getContainer()
      .render()
  );

  toolSide.appendChild(
    app
      .getControls()
      .getClearControl()
      .getClearButton()
      .render()
  );

  toolSide.appendChild(
    app
      .getControls()
      .getBuilderControl()
      .getContainer()
      .render()
  );

  toolSide.appendChild(
    app
      .getControls()
      .getPositionControl()
      .getContainer()
      .render()
  );

  let mathFunction = new MathFunction(expression, "rgb(96,128,255)");
  let grid = new Grid();

  app.getViewer().addFunction("main", mathFunction);
  app.getViewer().addGrid("main", grid);

  app.getViewer().redraw();
}

initializeApplication();
