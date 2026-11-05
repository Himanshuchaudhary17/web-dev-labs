
// Himanshu Chaudhary — Lab 10

// Previous Lab — Variables, Data Types, and Operators
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;

console.log(`${name} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Lab 10 — Storage API Feature Detection
function storageAvailable() {
    try {
        if (typeof localStorage === "undefined") {
            return false;
        }

        const testKey = "__storage_test__";
        localStorage.setItem(testKey, "test");
        localStorage.removeItem(testKey);
        return true;

    } catch (error) {
        console.warn("localStorage is unavailable:", error);
        return false;
    }
}

const canUseStorage = storageAvailable();


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


// Lab 10 — Part 1: Persistent Like Counter
// The likes variable remains private inside the closure.
function createLikeCounter() {
    let likes = 0;

    if (canUseStorage) {
        likes = Number(localStorage.getItem("likes")) || 0;
    }

    return {
        increment() {
            likes = likes + 1;

            if (canUseStorage) {
                try {
                    localStorage.setItem("likes", likes);
                } catch (error) {
                    console.warn("Could not save likes:", error);
                }
            }

            updateLikeDisplay(likes);
        },

        getLikes() {
            return likes;
        }
    };
}

const counter = createLikeCounter();

// Show previously saved likes when page loads.
updateLikeDisplay(counter.getLikes());


// Lab 8 — Defensive Code
if (likeBtn) {
    likeBtn.addEventListener("click", function() {
        counter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// Lab 10 — Part 2: Persistent Dark Mode
const themeBtn = document.querySelector("#theme-btn");

// Restore previous theme when page loads.
if (canUseStorage) {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        if (canUseStorage) {
            try {
                localStorage.setItem(
                    "theme",
                    isDark ? "dark" : "light"
                );
            } catch (error) {
                console.warn("Could not save theme:", error);
            }
        }
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


// Lab 9 — Promises
function getGreetingAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello from the future!");
        }, 800);
    });
}


// Lab 9 — Async/Await
async function showGreeting() {
    const message = await getGreetingAfterDelay();
    console.log(message);
}

showGreeting();


// Lab 9 — Fetch API
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
    if (!factDisplay) {
        return;
    }

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


// Lab 10 — Part 3: Geolocation API
const locationBtn = document.querySelector("#location-btn");
const locationDisplay = document.querySelector("#location-display");

if (locationBtn && locationDisplay) {

    locationBtn.addEventListener("click", function() {

        // Part 4 — Feature Detection
        if (!("geolocation" in navigator)) {
            locationDisplay.textContent =
                "Geolocation isn't supported.";
            return;
        }

        locationDisplay.textContent = "Getting your location...";

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);

                locationDisplay.textContent =
                    `You're near ${lat}, ${lon}`;
            },

            function(error) {
                if (error.code === 1) {
                    locationDisplay.textContent =
                        "Location access was denied.";
                } else {
                    locationDisplay.textContent =
                        "Couldn't get your location right now.";
                }

                console.warn("Geolocation error:", error);
            }
        );

    });
}
