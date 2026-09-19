console.log("script.js loaded");

const form = document.querySelector("form");
const zipInput = document.getElementById("zip");

const zipPattern = /^\d{5}$/;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValidZip = zipPattern.test(zipInput.value);

    console.log("ZIP entered:", zipInput.value);
    console.log("ZIP valid:", isValidZip);

    if (isValidZip) {
        alert("Valid ZIP code");
    } else {
        alert("ZIP code must contain exactly 5 digits.");
    }
});