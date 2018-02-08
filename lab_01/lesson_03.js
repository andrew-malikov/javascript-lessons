function initialize() {
    while(true) {
        var userName = getUserName();
        if (!confirm(`Your name: ${userName}\n Repit?`)) {
            alert("Right solution!");
            return;   
        }
        alert("Again...");
    }
}

function getUserName() {
    return prompt("Enter your name to this box", "Your name");
}

initialize();