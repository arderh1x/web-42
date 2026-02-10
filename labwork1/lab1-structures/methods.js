/* step 9 */
function useSplitForChars(string) {
    return string.split("");
}
console.log("Split string to chars array:", useSplitForChars("some words"));


/* step 10 */
function useReverse(string) {
    return string.split("").reverse().join("");
}
console.log("\nReverse string:", useReverse("duck is here"));


/* step 11 */
function useEndsWith(string) {
    return string.endsWith(".js");
}
console.log("\nIs 'file_.js_name' have .js file format?", useEndsWith("file_.js_name"));
console.log("Is 'script.js' have .js file format?", useEndsWith("script.js"));


/* step 12 */
function useSplitForWords(string) {
    string = string.replace(/[.,;:!?]/g, ""); // removing punctuation from string with regex (/g for replaceAll)
    return string.split(" ");
}
console.log("\nSplit string to words:", useSplitForWords("Hello, my world!"));


/* step 13 */
function useReplace(string, oldWord, newWord) {
    return string.replace(oldWord, newWord);
}
console.log("Replace 'many' to 'pretty':", useReplace("let's change some many words", "many", "pretty"));
