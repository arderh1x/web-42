/* step 1 */
console.log("1.");
// '+' can add numbers or concatenate strings:
// if at least 1 operand is string after toPrimitive() - toString() to every operand and concatenate them
// if not - toNumber() to every operand and add them

console.log("a) Adding 0:"); // result: number
console.log("to NaN:", 0 + NaN); // NaN: any number and any operator with NaN = NaN
console.log("to Infinity:", 0 + Infinity); // Infinity: any normal number + Inf = Inf
console.log("to false:", 0 + false); // 0: false -> 0; 0 + 0 = 0
console.log("to true:", 0 + true); // 1: true -> 1; 0 + 1 = 1
console.log("to null:", 0 + null); // 0: null -> 0; 0 + 0 = 0
console.log("to undefined:", 0 + undefined); // NaN: undefined -> NaN; 0 + NaN = NaN

console.log("\nb) Adding empty string (''):"); // result: second operand as string 
console.log("to NaN:", '' + NaN); // NaN
console.log("to Infinity:", '' + Infinity); // Infinity
console.log("to false:", '' + false); // false
console.log("to true:", '' + true); // true
console.log("to null:", '' + null); // null
console.log("to undefined:", '' + undefined); // undefined



/* step 2 */
console.log("\n\n2.");
// [] to string -> ''
// [1, 2, 3] to string -> '1,2,3'
// {} to string -> '[object Object]'
// {name: "John"} to string -> '[object Object]'

// [] to number -> 0
// [1, 2, 3] to number -> NaN
// {} to number -> NaN
// {age: 25} to number -> NaN

const var1 = [] + [];
console.log("[] + []:", var1); // in variable: '' + '' = ''
// in debug console (not console.log()): ''

const var2 = {} + [];
console.log("{} + []:", var2); // '[object Object]' + '' = '[object Object]'
// 0: {} for console is code block, so:  +[] = 0

const var3 = [] + {};
console.log("[] + {}:", var3); // '' + '[object Object]' = '[object Object]'
// '[object Object]'

const var4 = {} + {};
console.log("{} + {}:", var4); // '[object Object]' + '[object Object]' = '[object Object][object Object]'
// NaN: {} - code block, +{} = NaN

const var5 = [] - {}; // "-" operation is number-only
console.log("[] - {}:", var5); // 0 - NaN = NaN
// NaN



/* step 3 */
console.log("\n\n3.");

const arr1 = [];
console.log(arr1, "to string:", String(arr1)); // empty string

const arr2 = ['Name', true, 123, { age: 20 }];
console.log(arr2, "to string:", String(arr2)); // every element to string and , without space



/* step 4 */
console.log("\n\n4.");
let x = 1;

// problem 1: 'nonzero’
// a) ’ - Invalid character. - you can't use this for strings
// b) ' and ’ is different (even if second char was legit) - you need to use pair: "nonzero" or 'nonzero', but not 'nonzero" or "nonzero'


// problem 2: if-else allows usage without {}, but with given code we get error:
// ';' expected.

//solution a:
if (x === 0) console.log('zero'); else console.log('nonzero') // put ;

//solution b:
if (x === 0) console.log('zero')
else console.log('nonzero') // put else block to next line - auto ;



/* step 5 */
console.log("\n\n5.");
const dateNow = new Date();
dateNow.getMonth()

const dateToObject = (date) => {
    if (!date instanceof Date) return null;

    // enum for getDay(): numeric format feels less readable, so I decided to convert to word (0 is Sunday)
    const weekdaysEnum = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: weekdaysEnum[date.getDay()],
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
    }
};

console.log("Convert date of this moment to object:", dateToObject(new Date()));



/* step 6 */
console.log("\n\n6.");

function printCalendar(year, month) {
    const date = new Date(year, month - 1);
    const daysAmount = new Date(year, month, 0).getDate();
    const firstDayWeekday = new Date(year, month - 1, 1).getDay();

    let calendarString = "";
    for (let i = 1; i < firstDayWeekday || firstDayWeekday === 0; i++) {
        calendarString += "   "; // 3
        if (i === 6) break;
    }

    for (let day = 1; day <= daysAmount; day++) {
        calendarString += (day < 10) ? (" " + day + " ") : (day + " ");

        const dayWeekday = (firstDayWeekday + day - 1) % 7;
        if (dayWeekday === 0) calendarString += "\n";
    }

    console.log(`Year ${year}, month ${month}:\n`);
    console.log(calendarString);
}

printCalendar(2026, 1);