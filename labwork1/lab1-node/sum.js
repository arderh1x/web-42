/* step 6 */
const args = process.argv.slice(2);

const sum = args.reduce((tempSum, arg) => {
    arg = Number(arg);
    if (isNaN(arg)) return tempSum;
    else return tempSum + arg;
}, 0);

console.log(`Sum = ${sum}`);