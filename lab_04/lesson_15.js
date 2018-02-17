function AnimationHeader(content, bodyColor) {
    let header = document.createElement('h1');
    header.innerHTML = content;

    let originalBodyColor = document.body.style.background;

    header.addEventListener('mouseover', ()=>{
        changeBodyBackground(bodyColor);
    });

    header.addEventListener('mouseleave', ()=>{
        changeBodyBackground(originalBodyColor);
    });

    this.component = function() {
        return header;
    }
}


function changeBodyBackground(color) {
    document.body.style.background = color;
}

let color = "red";
let header = new AnimationHeader(`Change background to ${color}`, color);
document.body.appendChild(header.component());