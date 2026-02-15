/* step 4 */

class User {
    constructor(firstname, lastname, score) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.score = score;
    }
}

export const getUsersDB = () => [
    new User("Tom", "Crow", 45),
    new User("Crow", "Tom", 45),
    new User("Adam", "Arrow", 99),
    new User("Bob", "X-Mas", 33),
    new User("Duck", "Quack", 66),
    new User("Anna", "Volt", 71),
    new User("Path", "Normal", 16),
    new User("Tom", "Cross", 71),
    new User("Anna", "Show", 34),
    new User("Simon", "Alter", 50),
    new User("Margo", "Rose", 100),
    new User("Duck", "Chaotic", 75),
    new User("Thread", "Mul", 5),
    new User("Teapot", "Truly", 18),
    new User("Red", "Red", 7),
    new User("Oliver", "Rose", 55),
    new User("Emma", "Rez", 45),
    new User("Kuro", "Black", 20),
    new User("John", "Doe", 25),
    new User("Daniel", "Cool", 100),
];


export const fetchUsers = (amount = 10) => new Promise((resolve, reject) => setTimeout(() => {
    const users = getUsersDB();

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


export const getNewUsers = () => getUsersDB().slice(0, 5);