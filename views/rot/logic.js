document.querySelector(".titlebtn3").addEventListener('click', () => {window.brain.quitApp()});
document.querySelector(".titlebtn2").addEventListener('click', () => {window.brain.minimiseApp()});



function performROT() {
    rotValue = parseInt(document.getElementById("rvalue").value);
    rotContent = document.getElementById("content").value;
    
    letters_small = "abcdefghijklmnopqrstuvwxyz";
    letters_small_r = letters_small.split('').reverse().join('');
    letters_cap = letters_small.toUpperCase();
    letters_cap_r = letters_cap.split('').reverse().join('');
    
    encoded_msg = "";

    for(i=0; i < rotContent.length; i++) {
        let newValue;
        if(rotValue > 0 && letters_small.includes(rotContent[i])) {
            newValue = (letters_small.indexOf(rotContent[i]) + rotValue) % 26;
            encoded_msg += letters_small[newValue];
            continue;

        } else if (rotValue > 0 && letters_cap.includes(rotContent[i])) {
            newValue = (letters_cap.indexOf(rotContent[i]) + rotValue) % 26;
            encoded_msg += letters_cap[newValue];
            continue;

        } else if(rotValue < 0 && letters_small_r.includes(rotContent[i])) {
            newValue = (letters_small_r.indexOf(rotContent[i]) + (-1 * rotValue)) % 26;
            encoded_msg += letters_small_r[newValue];
            continue;

        } else if (rotValue < 0 && letters_cap_r.includes(rotContent[i])) {
            newValue = (letters_cap_r.indexOf(rotContent[i]) + (-1 * rotValue)) % 26;
            encoded_msg += letters_cap_r[newValue];
            continue;

        } else {
            encoded_msg += rotContent[i];
            continue;
        }
    }

    document.getElementById("content").value = encoded_msg;
}

document.getElementById("cipherBtn").addEventListener('click', performROT);
