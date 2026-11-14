
// Himanshu Chaudhary — Lab 11

// Previous Lab — Variables and Data Types
const studentName: string = "Ada";
let labsCompleted: number = 6;
const isEnrolled: boolean = false;

labsCompleted = labsCompleted + 1;

console.log(`${studentName} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Lab 10 — Check localStorage Availability
function storageAvailable(): boolean {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, "test");
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.warn("localStorage unavailable:", error);
        return false;
    }
}

const canUseStorage: boolean = storageAvailable();


// Lab 11 — Part 2: Typed LikeCounter Object
const likeBtn = document.querySelector<HTMLButtonElement>("#like-btn");
const likeCount = document.querySelector<HTMLElement>("#like-count");
const likeMessage = document.querySelector<HTMLElement>("#like-message");

const LikeCounter = {
    likes: canUseStorage
        ? Number(localStorage.getItem("likes")) || 0
        : 0,

    increment(): void {
        this.likes = this.likes + 1;

        if (canUseStorage) {
            localStorage.setItem("likes", this.likes.toString());
        }

        this.render();
    },

    render(): void {
        if (likeCount) {
            likeCount.textContent = `${this.likes} likes`;
        }

        if (likeMessage) {
            if (this.likes >= 10) {
                likeMessage.textContent =
                    "Wow, thanks for all the likes!";
            } else if (this.likes >= 5) {
                likeMessage.textContent =
                    "Glad you like it!";
            } else {
                likeMessage.textContent = "";
            }
        }
    }
};


LikeCounter.render();

if (likeBtn) {
    likeBtn.addEventListener("click", function(): void {
        LikeCounter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// Lab 10 — Persistent Dark Mode
const themeBtn =
    document.querySelector<HTMLButtonElement>("#theme-btn");

if (canUseStorage &&
    localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

if (themeBtn) {
    themeBtn.addEventListener("click", function(): void {
        document.body.classList.toggle("dark");

        const isDark: boolean =
            document.body.classList.contains("dark");

        if (canUseStorage) {
            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );
        }
    });
}


// Previous Lab — ZIP Code Validation
const form = document.querySelector<HTMLFormElement>("form");
const zipInput = document.querySelector<HTMLInputElement>("#zip");
const zipPattern: RegExp = /^\d{5}$/;

if (form && zipInput) {
    form.addEventListener("submit", function(event: Event): void {
        event.preventDefault();

        const isValidZip: boolean =
            zipPattern.test(zipInput.value);

        console.log("ZIP entered:", zipInput.value);
        console.log("ZIP valid:", isValidZip);

        if (isValidZip) {
            alert("Valid ZIP code");
        } else {
            alert("ZIP code must contain exactly 5 digits.");
        }
    });
}


// Lab 11 — Part 2: Typed Arrays and Loops
const goals: string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "Git"
];

const goalsList =
    document.querySelector<HTMLUListElement>("#goals-list");

if (goalsList) {
    goals.forEach(function(goal: string): void {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
}


// Lab 9 — Promises
function getGreetingAfterDelay(): Promise<string> {
    return new Promise<string>(function(resolve) {
        setTimeout(function(): void {
            resolve("Hello from the future!");
        }, 800);
    });
}


// Lab 9 — Async/Await
async function showGreeting(): Promise<void> {
    const message: string = await getGreetingAfterDelay();
    console.log(message);
}

showGreeting();


// Lab 11 — Part 5: CatFact Interface
interface CatFact {
    fact: string;
    length: number;
}


// Lab 9 — Fetch API With TypeScript
const factBtn =
    document.querySelector<HTMLButtonElement>("#fact-btn");

const factDisplay =
    document.querySelector<HTMLElement>("#fact-display");

async function loadFact(): Promise<void> {
    if (!factDisplay) {
        return;
    }

    factDisplay.textContent = "Loading...";

    try {
        const response: Response =
            await fetch("https://catfact.ninja/fact");

        if (!response.ok) {
            throw new Error("Server responded with an error");
        }

        const data = (await response.json()) as CatFact;

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


// Lab 10 — Geolocation API
const locationBtn =
    document.querySelector<HTMLButtonElement>("#location-btn");

const locationDisplay =
    document.querySelector<HTMLElement>("#location-display");

if (locationBtn && locationDisplay) {
    locationBtn.addEventListener("click", function(): void {

        if (!("geolocation" in navigator)) {
            locationDisplay.textContent =
                "Geolocation isn't supported.";
            return;
        }

        locationDisplay.textContent =
            "Getting your location...";

        navigator.geolocation.getCurrentPosition(
            function(position: GeolocationPosition): void {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);

                locationDisplay.textContent =
                    `You're near ${lat}, ${lon}`;
            },

            function(error: GeolocationPositionError): void {
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

// Lab 11 — Graduate Extension: Generic Functions

function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
}

// Test with a number
saveToStorage<number>("testLikes", 5);
const savedLikes = loadFromStorage<number>("testLikes");

console.log("Saved number:", savedLikes);

// Test with a CatFact object
const sampleFact: CatFact = {
    fact: "Cats have excellent night vision.",
    length: 33
};

saveToStorage<CatFact>("lastFact", sampleFact);
const savedFact = loadFromStorage<CatFact>("lastFact");

console.log("Saved CatFact:", savedFact);
