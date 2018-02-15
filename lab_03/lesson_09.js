function getThanksMessage(params) {
    let component = document.createElement("div");

    let thanks = document.createElement("h1");
    thanks.innerText = "Thank you for coming to our courses!";

    let modifiedTime = document.createElement("p");
    modifiedTime.innerText = document.lastModified;

    component.appendChild(thanks);
    component.appendChild(modifiedTime);

    return component;
}

function changeStyle() {
    document.body.style.backgroundColor = "#E7E6D8";
    document.body.style.color = "red";
}

document.body.appendChild(getThanksMessage());
changeStyle();