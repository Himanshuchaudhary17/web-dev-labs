// Himanshu Chaudhary — Lab 7

// Part 2 — Variables, Data Types, and Operators
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;

console.log(`${name} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Part 3 — Like Button
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");

let likes = 0;

likeBtn.addEventListener("click", function () {
    likes = likes + 1;
    likeCount.textContent = `${likes} likes`;
});


// Part 4 — Dark Mode Button
const themeBtn = document.querySelector("#theme-btn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});


// ZIP Code Validation from Previous Lab
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