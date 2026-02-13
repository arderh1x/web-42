/* step 6 */
function logCall(callback, ...args) {
    return new Promise((resolve) => setTimeout(() => {
        console.log("Execution time:", new Date().toLocaleString())
        resolve(callback(args))
    }, 1000));
}

const someFunc = (id) => {
    id++;
    console.log("Text in this function - Callback was called, id:", id);
    return id;
};


console.log("6. Result of logCall (4 times):");
logCall(someFunc, 10)
    .then((id1) => logCall(someFunc, id1))
    .then((id2) => logCall(someFunc, id2))
    .then((id3) => logCall(someFunc, id3));