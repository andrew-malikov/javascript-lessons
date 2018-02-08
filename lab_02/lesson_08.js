function redirect(params) {
    if (isIE())
        location.replace("../lab_01/lesson_01.html");
    else
        location.replace("../lab_01/lesson_03.html");
}

function isIE() {
    return navigator.userAgent.indexOf('MSIE') > 0;
}

redirect();