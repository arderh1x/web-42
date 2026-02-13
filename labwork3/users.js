/* step 4 */
function getUser(id) {
    const users = [ // idk where this array-db should be
        { name: "John", age: 23, city: "Boston", id: 0 },
        { name: "Bob", age: 18, city: "London", id: 1 },
        { name: "Ronald", age: 15, city: "New York", id: 2 },
        { name: "Jester", age: 34, city: "Chicago", id: 3 },
    ]

    const foundUser = users.find((user) => user.id === id);

    return new Promise((resolve, reject) => setTimeout(() => {
        if (foundUser !== undefined) resolve(foundUser);
        else reject("User not found");
    }, 1000));
}

console.log("4. Result of GetUser:")
getUser(1).then((user) => console.log(user)).catch((error) => console.error(error)); // uses then
getUser(10).then((user) => console.log(user)).catch((error) => console.error(error)); // uses catch



/* step 5 */
function loadUsers(ids) {
    const promises = ids.map((id) => getUser(id));

    return Promise.allSettled(promises).then((results) => results
        .filter((res) => res.status === "fulfilled") // >Обробіть ситуацію коли один з промісів був відхилений -> don't add to array
        .map((res) => res.value))
} // allSettled returns array of objects for both cases:
// {status: "fulfilled", value: result_from_resolve}
// or {status: "rejected", reason: result_from_reject}



/* step 7 */
async function showUsers(ids) { // also as demonstration of loadUsers work
    console.log("7. Loading...");

    try {
        const users = await loadUsers(ids);
        console.log("Loaded users: ", users);
    } catch (e) { console.error(e) }
    finally { console.log("Loading finished.") }
}

showUsers([0, 1, 10, 3, 2, 4, "a", 1]);