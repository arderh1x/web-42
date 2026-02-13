/* step 3 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}                             // or setTimeout(() => resolve(), ms)

console.log("3. Before sleep 1s");
await sleep(1000);
console.log("After sleep");
