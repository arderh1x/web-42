/* step 1 */
function average(...numbers) { // alternative to array-like "arguments"
    const onlyNumbers = numbers.flat(Infinity) // if function will get arrays without spread
        .filter(elem => (typeof elem === "number" && !isNaN(elem))); // "1" is not allowed, only true numbers

    if (onlyNumbers.length === 0) return null;

    const sum = onlyNumbers.reduce((tempSum, number) => tempSum + number, 0);
    return sum / onlyNumbers.length;
}

const testArr = [10, 20, 40];
console.log("1. Result of Average func:", average(2, 5, testArr, "text"));



/* step 2 */
function values(f, low, high) { // f - callback
    if (high < low) return null;

    const emptyArr = [...Array((high - low) + 1)]; // making empty slots for map iterations
    return emptyArr.map((_, i) => f(low + i));
}

console.log("\n2. Result of Values func:", values((a => a + 1), 5, 10));



/* step 3 */
function callWithContext(object, callback) {
    callback.call(object);
}

const person = { name: "Kuro", age: 18 };

function sayHappyBirthday() {
    const date = new Date().toLocaleDateString();
    const name = this.name;
    console.log(`Today is ${date}! Happy birthday ${name}.`);
}

console.log("\n3. Result of CallWithContext func:");
callWithContext(person, sayHappyBirthday);



/* step 4 */
function createObject(value = 0) {
    return {
        increment() { value++; return this; },
        getValue() { return value; },
    };
}
const testObj1 = createObject();
const testObj2 = createObject(25);

console.log("\n4. Result of CreateObject func:")
console.log("Increment first object with default value (0) 1 time:",
    testObj1.increment().getValue()); // 0 -> 1 -> display

console.log("Increment first object 3 more times:",
    testObj1.increment().increment().increment().getValue()); // 1 -> 2 -> 3 -> 4 -> display

console.log("Increment second object with value (25) 2 times:",
    testObj2.increment().increment().getValue()); // 25 -> 26 -> 27 -> display



/* step 5 */
function createGetGreeting() {
    let cashedName = null;
    let cashedGreeting = null;

    return function (name) {
        if (name === cashedName) return cashedGreeting + " - from cash";

        cashedName = name;
        cashedGreeting = `Hello, ${name}!`;
        return cashedGreeting;
    }
}

const getGreeting = createGetGreeting();
console.log("\n5. Result of GetGreeting func:");
console.log(getGreeting("Bob"));
console.log(getGreeting("Tom"));
console.log(getGreeting("Bob"));
console.log(getGreeting("Bob"));



/* step 6 */
function sum2Function(num1) {
    return function (num2) {
        return num1 + num2;
    }
} // without input checking - I wanna keep function as simple as possible for demonstration

const sum2Arrow = a => b => a + b;

console.log("\n6.Result of Sum func:", sum2Function(5)(7), ",", sum2Function(-19)(10));
console.log("Result of Sum func in arrow form:", sum2Arrow(5)(7), ",", sum2Arrow(-19)(10));



/* step 7 */
function searchFragment(fragmentsArr) {
    return function (fragment) {
        return fragmentsArr.includes(fragment);
    }
}

const searchFragmentArrow = fragmentsArr => fragment => fragmentsArr.includes(fragment);

const testFragmentsArr = ["some", "text fragments", "here, probably."];
console.log("\n7.Result of SearchFragment func in array", testFragmentsArr);

console.log("Is 'some' in array?", searchFragment(testFragmentsArr)("some"));
console.log("Is 'some' in array? (arrow func)", searchFragmentArrow(testFragmentsArr)("some"));

console.log("Is 'random value' in array?", searchFragment(testFragmentsArr)("random value"));
console.log("Is 'here' in array?", searchFragment(testFragmentsArr)("here"));



/* step 8 */
const capitalizeProperty = (arr, property) => arr.map(obj => {
    if (obj.hasOwnProperty(property)) {
        const newProperty = property[0].toUpperCase() + property.slice(1);
        obj[newProperty] = obj[property]; // losing property order, but I don't think it's that important
        delete obj[property];
    }
    return obj;
})

const testObjArr = [
    { name: "Bob", city: "London", age: 25 },
    { year: 2025, name: "lucky" },
    { balance: 60.5, isVerified: false },
];

const testObjArrResult = capitalizeProperty(testObjArr, "name");

console.log("\n8.Result of CapitalizeProperty func:");
console.log("Array before using func:", testObjArr);
console.log("Array after capitalizing 'name' prop:", testObjArrResult);



/* step 9 */
// Напишіть приклад для демонстрації функцій call, apply, bind
const displayObj = {
    name: "Object with method",
    displayMethod(...param) {
        console.log(`I got called by "${this.name}" with this arguments:`, param,
            "\nMy context:", this);
    }
};
const anotherDisplayObj = { name: "Another object without method" };

console.log("\n9. Result of Call, Apply and Bind methods:");
displayObj.displayMethod(1, "2");
displayObj.displayMethod.call(anotherDisplayObj, 3, "4");
displayObj.displayMethod.apply(anotherDisplayObj, [5, "6"]);

displayObj.displayMethod.bind(anotherDisplayObj)(7, "8");
const boundFunction = displayObj.displayMethod.bind(anotherDisplayObj, 9);
boundFunction("10");



/* step 10 */
function callbackInfo(callback, ...args) {
    const executeTime = new Date().toLocaleString();
    callback(...args);

    console.log("Callback name:", callback.name || "<anonymous>",
        "\nArguments array:", args,
        "\nExecute time:", executeTime);
}

function someNamedFunction(a, b) { console.log("Result of operation is", (a + b + 5)); };

console.log("\n10. Result of CallbackInfo func for named function:");
callbackInfo(someNamedFunction, 7, 13);
console.log("\nResult of CallbackInfo func for anon arrow function:");
callbackInfo(x => { console.log(`I got "${x}"`) }, "letter");



/* step 11 */
function cashGreetingTo10s() { // same as task 5, but with timer 
    let cashedName = null;
    let cashedGreeting = null;
    let expireTime = null;

    return function (name) {
        const currentTime = Date.now();

        if (name === cashedName && currentTime < expireTime) {
            expireTime = currentTime + 10000;
            return cashedGreeting + " - from cash";
        }

        cashedName = name;
        cashedGreeting = `Hello, ${name}!`;
        expireTime = currentTime + 10000;

        return cashedGreeting;
    }
}

const getTimedGreeting = cashGreetingTo10s();
console.log("\n10. Result of GetTimedGreeting func:");
console.log("No waiting:", getTimedGreeting("Shin"));
console.log("No waiting:", getTimedGreeting("Ene"));
console.log("No waiting:", getTimedGreeting("Shin"));
console.log("No waiting:", getTimedGreeting("Shin"));
setTimeout(() => {
    console.log("4s waiting:", getTimedGreeting("Shin"));
    setTimeout(() => {
        console.log("8s waiting:", getTimedGreeting("Shin"));
        setTimeout(() => {
            console.log("12s waiting:", getTimedGreeting("Shin"));
        }, 12000);
    }, 8000);
}, 4000); // nested because in other case timers will start at same moment
