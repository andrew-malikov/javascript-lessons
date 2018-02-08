function initialize() {
    appendLines(document.body, 10, 10);
}

function appendLines(node, linesCount, heightIncrement) {
    for (i = 1; i <= linesCount; i++)
        node.appendChild(createLine(heightIncrement * i))
}

function createLine(height) {
    var line = document.createElement("hr");
    line.width = height;
    return line;
}

document.addEventListener("DOMContentLoaded", initialize);