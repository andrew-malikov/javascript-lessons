function initializeTaskWithNumbers() {
    var x, y;
    x = parseInt(prompt("Input х", ''));
    y = parseInt(prompt("Input у", ''));
    if (x === y)
        alert("x equal y");
    else if (x < y)
        alert("Max number - y");
    else if (y < x)
        alert("Max number - x");
    else alert("Wrong x or y");
}

function initializeCheckPasswordTask() {
    var originalPassword = getPasswordFromUser("Create new password");
    if (!isPasswordValid(originalPassword)) {
        originalPassword = navigator.appName;
        alert(`Wrong password changed to ${originalPassword}`);
    }
    var checkedPassword = getPasswordFromUser("Enter password for check");
    if (originalPassword !== checkedPassword)
        alert("Wrong password");
    else alert("Correct password");
}

function getPasswordFromUser(message) {
    return prompt(message, "");
}

function isPasswordValid(password) {
    return typeof password === "string" && password.length > 0; 
}

initializeTaskWithNumbers();
initializeCheckPasswordTask();