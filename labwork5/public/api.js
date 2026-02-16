export const fetchUsers = (amount = 10) => new Promise((resolve, reject) => setTimeout(async () => {
    const response = await fetch("/api/users");
    let users = await response.json();

    const length = users.length;
    if (!Array.isArray(users)) reject("Error: Function got non-array.");
    else if (length < amount) reject(`Error: DB should have at least ${amount} users - have ${length}.`)
    else {
        for (let i = users.length - 1; i >= 1; i--) { // from last index (skip first - it doesn't have pair)
            const j = Math.floor(Math.random() * (i + 1)); // get random index from 0 to i (+ 1 -> how works random())
            [users[i], users[j]] = [users[j], users[i]]; // destructure: right part - tempArray
        } // https://en.wikipedia.org/wiki/Fisher–Yates_shuffle

        resolve(users.slice(0, amount));
    }
}, 1000));

// can test sorting with query params on this function
export const getNewUsers = async () => fetch("/api/users").then(res => res.json()).then(users => users.slice(0, 5));

export const getWeather = async () => fetch("/api/weather").then(res => res.json());

export const getGallery = async () => fetch("/api/gallery").then(res => res.json());