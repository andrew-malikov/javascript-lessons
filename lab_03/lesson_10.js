function getPseudoLink() {
    let link = document.createElement("p");

    link.classList.add("pseudo-link");
    link.addEventListener("click", () => {
        openNewWindow();
        link.classList.add("used-link");
    });
    link.innerText = "Click for help";

    return link;
}

function openNewWindow() {
    window.open("http://www.google.com", "",
        "toolbar=no, scrollbars=yes, width=500, height=500, resizable=yes, top=100, left=500")
}

document.body.appendChild(getPseudoLink());