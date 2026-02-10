/* step 5 */

// argv[0] - path to node, argv[1] - path to script, argv[2+] - arguments
const args = process.argv.slice(2); // first index, second index opt

args.forEach(arg => { console.log(`ARG:${arg}`) });

/* step 9 */
console.log(process.argv);
console.log(args);