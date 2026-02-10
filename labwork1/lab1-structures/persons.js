/* step 1 */
const persons = [
    { name: "John", age: 23, city: "Boston" },
    { name: "Bob", age: 18, city: "London" },
    { name: "Ronald", age: 15, city: "New York" },
    { name: "Jester", age: 34, city: "Chicago" },
    { name: "Marlon", age: 51, city: "Amsterdam" },
];
persons.groupName = "A";
persons.teacher = "Joan Doe";
persons.year = "2023";

console.log("Default for, getting array elements:");
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i]);
} // default - only elements (i - only-number field)

console.log("\nForEach, getting array elements:"); // not a "for variation", but also for-loop
persons.forEach((element) => console.log(element)); // can also get index, but only for elements

console.log("\nFor of, getting array elements:");
for (const element of persons) {
    console.log(element);
} // for of - only elements

console.log("\nFor in, getting array elements:");
for (const elementId in persons) {
    if (isNaN(Number(elementId))) continue; // skip elements
    console.log(persons[elementId]);
} // actually it's possible to display everything in one loop, but I decided to do like this for demonstration

console.log("\nFor in, getting array properties:");
for (const property in persons) {
    if (!isNaN(Number(property))) continue; // skip array properties
    console.log(`${property}: ${persons[property]}`);
} // for in - every field (so can get every property -> made 2 loops)



/* step 3 */
const personObject = {
    ...persons[3],
    get birthYear() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.age;
    }
}

console.log("\n\nPerson with getter:", personObject);
console.log(`Birth year before changing: ${personObject.birthYear}`);
personObject.birthYear = 2000;
console.log(`Birth year after changing: ${personObject.birthYear}`)


/* step 5 */
const personsString = [];
for (const person of persons) {
    const personStr = `${person.name} from ${person.city} born in ${new Date().getFullYear() - person.age}`
    personsString.push(personStr);
} // can't use getter, because it was written for only one object
// not sure about using Object.defineProperty, prototypes or classes for this lab

console.log("\n\nPersons as array of strings:", personsString);



/* step 6 */
function getPersonsByAge(age = 20, isOlder = true) { // array is global
    age = Number(age);
    if (isNaN(age)) return ["Error: age is not a number."];

    if (isOlder) return persons.filter((person) => person.age > age);
    else return persons.filter((person) => person.age <= age);
}

function getPersonsByAgeCustom(age = 20, isOlder = true) { // writing algorithm != using already created method, I think...
    age = Number(age);
    if (isNaN(age)) return ["Error: age is not a number."];

    const filteredPersons = [];

    if (isOlder) {
        for (const person of persons) {
            if (person.age > age) filteredPersons.push(person);
        }
    } else for (const person of persons) {
        if (person.age <= age) filteredPersons.push(person);
    }

    return filteredPersons;
}

const isOlderS = true;
const ageS = 20;
console.log(`\n\nPersons ${isOlderS ? "older" : "younger"} than ${ageS} [function with .filter()]:`);
console.log(getPersonsByAge(ageS, isOlderS));

console.log("\nAnd function with regular for loop:")
console.log(getPersonsByAgeCustom(ageS, isOlderS));


/* step 7 */
const { name: personName, city: personCity } = personObject;
console.log(`\n\nDestructuring object to variables: \nPersonName: ${personName}, CityName: ${personCity}`);

const [firstPerson] = persons;
console.log("\nDestructing array to first element:\n", firstPerson)


/* step 8 */
function getUserData(userName) {
    const user = persons.find((person) => person.name === userName);
    if (user !== undefined) return user;
    else throw new Error('Unable to find user');
}

function getUserDataCustom(userName) {
    for (const person of persons) {
        if (person.name === userName) return person;
    }
    throw new Error('Unable to find user');
}


function showUserInfo(userName) {
    try {
        const user = getUserDataCustom(userName); // change function here manually
        console.log(user);
    }
    catch (e) { console.log("Error:", e.message) }
    finally { console.log("Loading finished.") }
}

const nameS = "Bob";
console.log(`\n\nShow user with name ${nameS}:`);

showUserInfo(nameS);


