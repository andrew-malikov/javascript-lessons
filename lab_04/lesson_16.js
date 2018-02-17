function LiveHeader(content) {
    let header = document.createElement('h1');
    
    header.innerHTML = content;
    header.classList.add('live-header');

    header.addEventListener('click', ()=>{
        header.style.textDecoration = 'overline';
    });
    header.addEventListener('dblclick', ()=>{
        header.style.textDecoration = 'line-through';
    });

    this.component = function() {
        return header;
    }
}

let header = new LiveHeader("Click or double click...");
document.body.appendChild(header.component());