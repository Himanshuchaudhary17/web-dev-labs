
// Himanshu Chaudhary — Lab 8

// Previous Lab — Variables, Data Types, and Operators
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;

console.log(`${name} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Lab 8 — Like Counter
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");


// Lab 8 — Part 1 and Part 3: Functions and Conditionals
function updateLikeDisplay(count) {
    if (likeCount) {
        likeCount.textContent = `${count} likes`;
    }

    if (likeMessage) {
        if (count >= 10) {
            likeMessage.textContent =
                "Wow, thanks for all the likes!";
        } else if (count >= 5) {
            likeMessage.textContent =
                "Glad you like it!";
        } else {
            likeMessage.textContent = "";
        }
    }
}


// Lab 8 — Graduate Extension: Closure-Based Encapsulation
function createLikeCounter() {
    let likes = 0;

    return {
        increment() {
            likes = likes + 1;
            updateLikeDisplay(likes);
        },

        getLikes() {
            return likes;
        }
    };
}

const counter = createLikeCounter();


// Lab 8 — Part 4: Defensive Code
if (likeBtn) {
    likeBtn.addEventListener("click", function () {
        counter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// Previous Lab — Dark Mode Button
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");
    });
}


// Previous Lab — ZIP Code Validation
const form = document.querySelector("form");
const zipInput = document.getElementById("zip");

const zipPattern = /^\d{5}$/;

if (form && zipInput) {
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
}


// Lab 8 — Part 2: Arrays and Loops
const goals = ["HTML", "CSS", "JavaScript", "Git"];
const goalsList = document.querySelector("#goals-list");

if (goalsList) {
    goals.forEach(function (goal) {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
}
