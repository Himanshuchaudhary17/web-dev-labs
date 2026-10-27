
// Himanshu Chaudhary — Lab 9


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


// Lab 8 — Functions and Conditionals
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


// Lab 8 — Defensive Code
if (likeBtn) {
    likeBtn.addEventListener("click", function() {
        counter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// Previous Lab — Dark Mode Button
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark");
    });
}


// Previous Lab — ZIP Code Validation
const form = document.querySelector("form");
const zipInput = document.getElementById("zip");

const zipPattern = /^\d{5}$/;

if (form && zipInput) {
    form.addEventListener("submit", function(event) {
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


// Lab 8 — Arrays and Loops
const goals = ["HTML", "CSS", "JavaScript", "Git"];
const goalsList = document.querySelector("#goals-list");

if (goalsList) {
    goals.forEach(function(goal) {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
}


 // Lab 9 — Part 2: Promises
 function getGreetingAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello from the future!");
        }, 800);
    });
}


 // Lab 9 — Part 3: Async/Await
 async function showGreeting() {
    const message = await getGreetingAfterDelay();
    console.log(message);
}

showGreeting();


// Lab 9 — Part 4: Fetch API
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
    factDisplay.textContent = "Loading...";

    try {
        const response = await fetch("https://catfact.ninja/fact");

        if (!response.ok) {
            throw new Error("Server responded with an error");
        }

        const data = await response.json();
        factDisplay.textContent = data.fact;

    } catch (error) {
        factDisplay.textContent =
            "Couldn't load a fact right now. Try again.";
        console.error(error);
    }
}

if (factBtn && factDisplay) {
    factBtn.addEventListener("click", loadFact);
}
