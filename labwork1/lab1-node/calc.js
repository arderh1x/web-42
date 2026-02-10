/* step 7 */
const args = process.argv.slice(2);

const num1 = Number(args[1]);
const num2 = Number(args[2]);
if (isNaN(num1) || isNaN(num2)) {
    console.log("Invalid number.");
    process.exit(1);
}

const operator = args[0];
let result;
switch (operator) {
    case "add":
        result = num1 + num2;
        break;

    case "sub":
        result = num1 - num2;
        break;

    case "mul":
        result = num1 * num2;
        break;

    case "div":
        result = num1 / num2;
        break;

    default:
        console.log("Invalid operator.");
        process.exit(1);
}

console.log(`Result = ${result}`);