/* step 2 */
const defaults = {
    mode: "test",
    debugLevel: "error",
    logFolder: "root",
}

const userSetting = {
    mode: "production",
    debugLevel: "trace",
}


function combiner1(defaults, userSetting) {
    return Object.assign({}, defaults, userSetting);
}

function combiner2(defaults, userSetting) {
    return { ...defaults, ...userSetting };
}

function combiner3(defaults, userSetting) {
    const result = {};
    for (const key in defaults) result[key] = defaults[key];
    for (const key in userSetting) result[key] = userSetting[key];
    return result;
}


const combine1 = combiner1(defaults, userSetting);
console.log("With Object.assign:", combine1);

const combine2 = combiner2(defaults, userSetting);
console.log("With spread operator:", combine2);

const combine3 = combiner3(defaults, userSetting);
console.log("With for in loop:", combine3);

