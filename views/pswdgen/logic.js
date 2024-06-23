document.querySelector(".titlebtn3").addEventListener('click', () => {window.brain.quitApp()});
document.querySelector(".titlebtn2").addEventListener('click', () => {window.brain.minimiseApp()});

document.getElementById("pswdLen").addEventListener('mousemove', () => {
    document.getElementById("lenT").innerHTML = document.getElementById("pswdLen").value;
});

document.getElementById("pswdLen").addEventListener('change', () => {
    document.getElementById("lenT").innerHTML = document.getElementById("pswdLen").value;
});

var totalChars = "";

document.getElementById("check1").addEventListener('change', () => {
    if(document.getElementById("check1").checked) {totalChars += "abcdefghijklmnopqrstuvwxyz"} else {totalChars = totalChars.replace("abcdefghijklmnopqrstuvwxyz", "")}
});

document.getElementById("check2").addEventListener('change', () => {
    if(document.getElementById("check2").checked) {totalChars += "abcdefghijklmnopqrstuvwxyz".toUpperCase()} else {totalChars = totalChars.replace("abcdefghijklmnopqrstuvwxyz".toUpperCase(), "")}
});

document.getElementById("check3").addEventListener('change', () => {
    if(document.getElementById("check3").checked) {totalChars += "0123456789"} else {totalChars = totalChars.replace("0123456789", "")}
});

document.getElementById("check4").addEventListener('change', () => {
    if(document.getElementById("check4").checked) {totalChars += "~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./"} else {totalChars = totalChars.replace("~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./", "")}
});



function generatePassword() {
    let length_ = parseInt(document.getElementById("pswdLen").value);
    let pswd = "";

    if(totalChars != "") {
        while (pswd.length < length_) {
            pswd += totalChars[getRandomNumber(0, totalChars.length-1)];
        }   
    }
    
    document.getElementById("password").value = pswd;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
