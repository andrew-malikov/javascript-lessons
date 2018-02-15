function getDegreeTable(base, rowCount) {
    let table = document.createElement("table");

    table.appendChild(getDegreeTableHeader());
    for (let i = 1; i <= rowCount; i++)
        table.appendChild(getDegreeRow(base, i));

    return table;
}

function getDegreeRow(base, degree) {
    let row = document.createElement("tr");

    let inputData = document.createElement("td");
    inputData.innerHTML = `${base}${degree.toString().sup()}`;

    let result = document.createElement("td");
    result.innerHTML = `${Math.pow(base, degree)}`;

    row.appendChild(inputData);
    row.appendChild(result);

    return row;
}

function getDegreeTableHeader() {
    let header = document.createElement("tr");

    let inputData = document.createElement("th");
    inputData.innerHTML = "Degree";

    let result = document.createElement("th");
    result.innerHTML = "Result";

    header.appendChild(inputData);
    header.appendChild(result);

    return header;
}

document.body.appendChild(getDegreeTable(2, 10));