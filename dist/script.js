"use strict";
// Himanshu Chaudhary — Lab 11
// Previous Lab — Variables and Data Types
const studentName = "Ada";
let labsCompleted = 6;
const isEnrolled = false;
labsCompleted = labsCompleted + 1;
console.log(`${studentName} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);
// Lab 10 — Check localStorage Availability
function storageAvailable() {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, "test");
        localStorage.removeItem(testKey);
        return true;
    }
    catch (error) {
        console.warn("localStorage unavailable:", error);
        return false;
    }
}
const canUseStorage = storageAvailable();
// Lab 11 — Part 2: Typed LikeCounter Object
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");
const LikeCounter = {
    likes: canUseStorage
        ? Number(localStorage.getItem("likes")) || 0
        : 0,
    increment() {
        this.likes = this.likes + 1;
        if (canUseStorage) {
            localStorage.setItem("likes", this.likes.toString());
        }
        this.render();
    },
    render() {
        if (likeCount) {
            likeCount.textContent = `${this.likes} likes`;
        }
        if (likeMessage) {
            if (this.likes >= 10) {
                likeMessage.textContent =
                    "Wow, thanks for all the likes!";
            }
            else if (this.likes >= 5) {
                likeMessage.textContent =
                    "Glad you like it!";
            }
            else {
                likeMessage.textContent = "";
            }
        }
    }
};
LikeCounter.render();
if (likeBtn) {
    likeBtn.addEventListener("click", function () {
        LikeCounter.increment();
    });
}
else {
    console.warn("like-btn not found on this page");
}
// Lab 10 — Persistent Dark Mode
const themeBtn = document.querySelector("#theme-btn");
if (canUseStorage &&
    localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}
if (themeBtn) {
    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        const isDark = document.body.classList.contains("dark");
        if (canUseStorage) {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        }
    });
}
// Previous Lab — ZIP Code Validation
const form = document.querySelector("form");
const zipInput = document.querySelector("#zip");
const zipPattern = /^\d{5}$/;
if (form && zipInput) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const isValidZip = zipPattern.test(zipInput.value);
        console.log("ZIP entered:", zipInput.value);
        console.log("ZIP valid:", isValidZip);
        if (isValidZip) {
            alert("Valid ZIP code");
        }
        else {
            alert("ZIP code must contain exactly 5 digits.");
        }
    });
}
// Lab 11 — Part 2: Typed Arrays and Loops
const goals = [
    "HTML",
    "CSS",
    "JavaScript",
    "Git"
];
const goalsList = document.querySelector("#goals-list");
if (goalsList) {
    goals.forEach(function (goal) {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
}
// Lab 9 — Promises
function getGreetingAfterDelay() {
    return new Promise(function (resolve) {
        setTimeout(function () {
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
// Lab 9 — Fetch API With TypeScript
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
        const data = (await response.json());
        factDisplay.textContent = data.fact;
    }
    catch (error) {
        factDisplay.textContent =
            "Couldn't load a fact right now. Try again.";
        console.error(error);
    }
}
if (factBtn && factDisplay) {
    factBtn.addEventListener("click", loadFact);
}
// Lab 10 — Geolocation API
const locationBtn = document.querySelector("#location-btn");
const locationDisplay = document.querySelector("#location-display");
if (locationBtn && locationDisplay) {
    locationBtn.addEventListener("click", function () {
        if (!("geolocation" in navigator)) {
            locationDisplay.textContent =
                "Geolocation isn't supported.";
            return;
        }
        locationDisplay.textContent =
            "Getting your location...";
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude.toFixed(2);
            const lon = position.coords.longitude.toFixed(2);
            locationDisplay.textContent =
                `You're near ${lat}, ${lon}`;
        }, function (error) {
            if (error.code === 1) {
                locationDisplay.textContent =
                    "Location access was denied.";
            }
            else {
                locationDisplay.textContent =
                    "Couldn't get your location right now.";
            }
            console.warn("Geolocation error:", error);
        });
    });
}
// Lab 11 — Graduate Extension: Generic Functions
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
}
// Test with a number
saveToStorage("testLikes", 5);
const savedLikes = loadFromStorage("testLikes");
console.log("Saved number:", savedLikes);
// Test with a CatFact object
const sampleFact = {
    fact: "Cats have excellent night vision.",
    length: 33
};
saveToStorage("lastFact", sampleFact);
const savedFact = loadFromStorage("lastFact");
console.log("Saved CatFact:", savedFact);
