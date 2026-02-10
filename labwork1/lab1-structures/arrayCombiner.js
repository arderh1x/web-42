/* step 4 */
const arr1 = ["one", "two", "three"];
const arr2 = ["four", "five", "two", 15];


const comb1 = [...arr1, ...arr2];
console.log("With spread operator: ", comb1);

const comb2 = arr1.concat(arr2);
console.log("\nWith concat: ", comb2);


const comb3 = arr1.slice()
comb3.push(...arr2); // making copy of arr1 with slice, and pushing arr2 as spreading to result arr
console.log("\nWith slice.push(spread operator): ", comb3);


const comb4 = arr2.reduce((combiner, elem) => {
    combiner.push(elem);
    return combiner;
}, [...arr1]); // same logic, but adding each element from arr2 separately in loop
console.log("\nWith reduce: ", comb4);


const comb5 = [];
for (const elem of arr1) comb5.push(elem);
for (const elem of arr2) comb5.push(elem);
console.log("\nWith for of loop: ", comb5);


// const combX = Object.assign([], arr1, arr2);  -- technically it works, but uhh no, not for arrays with their numeric "fields"
// console.log("\nWith Object.assign: ", combX);