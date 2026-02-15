import { fetchUsers, getNewUsers } from './api.js'

const state = {
    fetchedUsers: [],
    isSortedAsc: null,
}

/* step 3 */
function init() {
    /* 1) */
    const header = document.createElement("header");
    const main = document.createElement("main");
    const footer = document.createElement("footer");
    document.querySelector("#main").append(header, main, footer);

    const leftPanel = document.createElement("div");
    leftPanel.id = "leftPanel";
    const content = document.createElement("div");
    content.id = "content";
    const rightPanel = document.createElement("div");
    rightPanel.id = "rightPanel";

    main.append(leftPanel, content, rightPanel);


    /* 3) */
    leftPanel.append(createLoader());
    content.append(createLoader());
    rightPanel.append(createLoader());


    /* 4) */
    const userRating = document.createElement("button");
    userRating.textContent = "User Rating";
    const news = document.createElement("button");
    news.textContent = "News";
    const contacts = document.createElement("button");
    contacts.textContent = "Contacts";
    const about = document.createElement("button");
    about.textContent = "About";

    const buttons = [userRating, news, contacts, about];
    buttons.forEach(btn => btn.addEventListener("click", () => {
        if (content.querySelector("h1")) content.querySelector("h1").remove();

        const h1Content = document.createElement("h1");
        h1Content.textContent = btn.textContent;
        if (content.querySelector(".loader").style.display !== "none") h1Content.style.display = "none";

        content.prepend(h1Content);
    }));

    header.append(...buttons);


    /* 5) */
    const currentUsers = document.createElement("div");
    currentUsers.innerHTML = "Current users: <b id='count'>0</b>";

    const newUsers = document.createElement("div");
    // should be rewritten if getNewUsers becomes async   
    newUsers.textContent = "New users: " + getNewUsers().map(user => user.firstname + " " + user.lastname).join(", ");
    footer.append(currentUsers, newUsers);


    /* 6) */
    setTimeout(() => {
        const loaderContent = content.querySelector(".loader");
        loaderContent.style.display = "none";
        const h1Content = content.querySelector("h1");
        if (h1Content) h1Content.style.display = "block";

        const pContent = document.createElement("p");
        pContent.textContent = "No users";

        const getUsers = document.createElement("button");
        getUsers.textContent = "Get Users";
        getUsers.id = "getUsers";
        getUsers.addEventListener("click", onGetUsers);

        content.append(pContent, getUsers);
    }, 1000)


    setLeftPanel();
    setRightPanel();
}

function createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader";
    return loader;
} // 3.3 - don't wanna duplicate code too much
// UPD: ... 


/* step 5 */
function onGetUsers() {
    const userInfo = document.querySelector("#content p");
    userInfo.textContent = "Getting users...";
    this.style.display = "none";

    const currentUsersCount = document.querySelector("#count");
    currentUsersCount.textContent = "Loading...";

    const scoresSum = document.querySelector("#scoresSum");
    scoresSum.textContent = "Loading..."

    fetchUsers(10).then(users => {
        state.fetchedUsers = [...users]; // for sorting
        calcCurrentUsers(users);
        calcScoresSum(users);
        displayEditTable(true);

        const table = createTable(users);
        userInfo.replaceWith(table);

    }).catch(error => {
        currentUsersCount.textContent = 0;
        scoresSum.textContent = 0;

        userInfo.textContent = error;
        this.style.display = "inline-block";
    })
}


function calcCurrentUsers(users) {
    const count = document.querySelector("#count");
    count.textContent = users.length;

}

function calcScoresSum(users) {
    const sum = document.querySelector("#scoresSum");
    sum.textContent = users.reduce((tSum, user) => tSum + user.score, 0);
}


function createTable(users) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = ["Firstname", "Lastname", "Score"];
    const thArr = headers.map(header => { // th - header's cell 
        const th = document.createElement("th");
        th.textContent = header;
        if (header === "Lastname") th.addEventListener("click", onLastnameSorting); // 9
        return th;
    });
    headerRow.append(...thArr);
    thead.append(headerRow);

    const tbody = document.createElement("tbody");
    users.forEach(({ firstname, lastname, score }, id) => {
        const row = document.createElement("tr"); // row
        row.id = id; // for searching

        const tdFirstname = document.createElement("td"); // regular cell
        tdFirstname.textContent = firstname;

        const tdLastname = document.createElement("td");
        tdLastname.textContent = lastname;

        const tdScore = document.createElement("td");
        tdScore.textContent = score;

        const tdDelete = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", onDelete);

        if (!document.querySelector("#editTable").checked) tdDelete.style.display = "none";
        tdDelete.append(deleteBtn);

        row.append(tdFirstname, tdLastname, tdScore, tdDelete);
        tbody.append(row);
    });

    table.append(thead, tbody);
    return table;
}


/* step 6*/
function setLeftPanel() {
    setTimeout(() => {
        document.querySelector("#leftPanel .loader").remove();

        const searchInput = document.createElement("input");
        searchInput.id = "searchInput";
        const searchBtn = document.createElement("button");
        searchBtn.textContent = "Search";
        searchBtn.addEventListener("click", onSearch);

        document.querySelector("#leftPanel").append(searchInput, searchBtn);
    }, 1000);

}

function onSearch() {
    [...document.querySelectorAll("#content tr")].forEach(row => row.className = "");

    const searchRequest = document.querySelector("#searchInput").value.trim();
    if (!searchRequest) return;
    const usersString = state.fetchedUsers
        .map(({ firstname, lastname, score }) => `${firstname} ${lastname} ${score}`);

    const ids = usersString.map((str, id) => {
        if (str.includes(searchRequest)) return id;
        else return -1;
    }).filter(id => id !== -1);

    const filteredRows = ids.map(id => document.querySelector(`[id="${id}"]`));
    filteredRows.forEach(row => row.className = "yellow");
}


/* step 7-8 */
function setRightPanel() {
    setTimeout(() => {
        document.querySelector("#rightPanel .loader").remove();

        const sum = document.createElement("p");
        sum.innerHTML = "Sum of scores: <b id='scoresSum'>0</b>";
        document.querySelector("#rightPanel").append(sum);


        const editTable = document.createElement("input");
        editTable.type = "checkbox";
        editTable.id = "editTable";
        editTable.addEventListener("change", onEditTable);

        const editTableLabel = document.createElement("label");
        editTableLabel.htmlFor = "editTable";
        editTableLabel.textContent = "Edit table";

        editTable.style.display = "none";
        editTableLabel.style.display = "none"; // show only when table exists
        document.querySelector("#rightPanel").append(editTable, editTableLabel);
    }, 1000);
}


function displayEditTable(isShow = true) {
    const checkbox = document.querySelector("#editTable");
    const label = checkbox.labels[0];
    if (isShow) {
        checkbox.style.display = "inline-block";
        label.style.display = "inline-block";
    }

    else {
        checkbox.style.display = "none";
        label.style.display = "none";
    }
}

function onEditTable() {
    const tbody = document.querySelector("#content table tbody");
    const deleteTdBtns = [...tbody.children].map(tr => tr.lastElementChild);

    if (this.checked) deleteTdBtns.forEach(td => td.style.display = "table-cell");
    else deleteTdBtns.forEach(td => td.style.display = "none");
}


function onDelete() {
    const row = this.parentElement.parentElement; // button -> td -> tr

    const removedUser = state.fetchedUsers[+row.id];
    state.fetchedUsers = state.fetchedUsers.filter(u => u !== removedUser); // recreate arr without removed user

    calcCurrentUsers(state.fetchedUsers);
    calcScoresSum(state.fetchedUsers);

    if (state.fetchedUsers.length !== 0) {
        const newTable = createTable(state.fetchedUsers);
        document.querySelector("#content table").replaceWith(newTable);
    }

    else {
        document.querySelector("#getUsers").style.display = "inline-block";
        const p = document.createElement("p");
        p.textContent = "All users were deleted from table";
        document.querySelector("#content table").replaceWith(p);
        displayEditTable(false);
    }
}


/* step 9 */
function onLastnameSorting() {
    console.debug("click");

    const users = state.fetchedUsers;
    if (!state.isSortedAsc) {
        users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        state.isSortedAsc = true;
    } else {
        users.sort((a, b) => b.lastname.localeCompare(a.lastname));
        state.isSortedAsc = false;
    }

    const sortedTable = createTable(users);
    document.querySelector("table").replaceWith(sortedTable);
}


init();