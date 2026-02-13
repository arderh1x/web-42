/* step 1 */
const randomNumber = () => Math.floor(Math.random() * 11);

function invokeAfterDelay(callback, ms) {
    return new Promise((resolve) => setTimeout(() => resolve(callback()), ms));
}

invokeAfterDelay(randomNumber, 1000)
    .then((result) => console.log("1. Result of InvokeAfterDelay: ", result));



/* step 2 */
function produceRandomAfterDelay(ms) {
    return invokeAfterDelay(randomNumber, ms);
}

Promise.all([
    produceRandomAfterDelay(2000),
    produceRandomAfterDelay(3000)
]).then((results) => {
    const sum = results.reduce((tempSum, number) => tempSum + number, 0);
    console.log("\n2. Sum of", results, "from ProduceRandomAfterDelay: ", sum);
});
