function getRedirectToPDFComponent(url, label) {
    return getPseudoLink("click", () => {
        if (!confirm("Acrobat software is required. Continue?"))
            return;
        download(url, label);
    }, label);
}

// TODO: use http request
function download(url, label) {
    let link = document.createElement("a");

    link.download = name;
    link.href = url;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    delete link;
}

function getPseudoLink(event, method, label) {
    let link = document.createElement("p");

    link.classList.add("pseudo-link");
    link.addEventListener(event, () => {
        method();
        link.classList.add("used-link");
    });
    link.innerText = label;

    return link;
}

function getBackgroundChangeComponent() {
    let component = document.createElement("p");

    component.innerText = "Change bacground to #afe1d1";

    component.addEventListener("mouseenter", () => {
        document.body.style.background = "#afe1d1";
    });
    component.addEventListener("mouseout", () => {
        document.body.style.background = "white";
    });

    return component;
}

function changeBodyTransitions() {
    document.body.style.transitionProperty = "all";
    document.body.style.transitionDuration = ".3s";
    document.body.style.transitionTimingFunction = "easy-out";
}

document.body.appendChild(getRedirectToPDFComponent("resources/golang-tdd.pdf", "TDD with Go"));
changeBodyTransitions();
document.body.appendChild(getBackgroundChangeComponent());
