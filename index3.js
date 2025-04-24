//data looping untuk password
var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

let passwordLength = document.getElementById("passwordLength");
let password = document.getElementById("password");

function generatePassword(len, callback) {
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeric = "0123456789";
    const symbol = ".,_";
    const data = lowerAlphabet + upperAlphabet + numeric + symbol;
    let generator = "";

    for (let index = 0; index < len; index++) {
        generator += data[Math.floor(Math.random() * data.length)];
        callback(index);
    }

    return generator;
}
//minimal dan maximal Password
function getPassword() {
    const length = parseInt(passwordLength.value);

    if (length < 8 || length > 30) {
        return;
    }

    const newPassword = generatePassword(length, index => {
        console.log(`Generating... ${index + 1}/${length}`);
    });

    password.value = newPassword;
   // alert("Password telah dibuat!");//
}
//fungsi copy paste password
function copyPassword() {
    navigator.clipboard.writeText(password.value);
}
//fungsi download password
function savePassword() {
    const passwordText = password.value;
    const saveButton = document.createElement("a");

    saveButton.setAttribute(
        "href",
        `data:text/plain;charset=utf-8,${encodeURIComponent(
            `Password saya: ${passwordText}`
        )}`
    );
    saveButton.setAttribute("download", "mypasswordLOG.txt");

    document.body.appendChild(saveButton);
    saveButton.click();
    document.body.removeChild(saveButton);

  //  alert("Disimpan"); //
}
//fungsi untuk range value
const slidervalue = document.querySelector("span");
const inputslider = document.querySelector("input");
inputslider.oninput = () => {
    let value = inputslider.value;
    slidervalue.textContent = value;
    slidervalue.style.left = value / 2 + "%";
    slidervalue.classList.add("show");
};
inputslider.onblur = () => {
    slidervalue.classList.remove("show");
};
//Panjang password dan range progress
const rangeInput = document.getElementById("passwordLength");

// Set nilai awal ke minimum
rangeInput.value = rangeInput.min;

// Fungsi untuk memperbarui tampilan progres bar
function updateProgressBar() {
    let value = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min)) * 100;
    rangeInput.style.background = `linear-gradient(to right, #8E9396 0%, #8E9396 ${value}%, #ddd ${value}%, #ddd 100%)`;
}

// Jalankan update saat pertama kali website dibuka
updateProgressBar();

// Event listener untuk perubahan nilai slider
rangeInput.addEventListener("input", updateProgressBar);