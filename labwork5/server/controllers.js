import usersDB from "./usersDB.js"
import path from "path";
import fs from "fs";
const __dirname = path.resolve();

// res.json(data), so express do:
// - call JSON.stringify(data);
// - make Content-Type: application/json in header
// - send response

export const getUsersAPI = (req, res) => {
    let users = [...usersDB];
    if (Object.keys(req.query).length === 0) return res.json(users); // if 0 any params - don't sort at all

    const { sortBy = "firstname", order = "asc" } = req.query; // default values
    const validColumns = ["firstname", "lastname"];
    const validOrders = ["asc", "desc"];

    if (!validColumns.includes(sortBy.toLowerCase())) // 400 bad req
        return res.status(400).json({ error: `Invalid "sortBy" value: ${sortBy}` });

    if (!validOrders.includes(order.toLowerCase()))
        return res.status(400).json({ error: `Invalid "order" value: ${order}` });

    const sortOrder = (order === "asc" ? 1 : -1);
    users.sort((a, b) => a[sortBy].localeCompare(b[sortBy]) * sortOrder);
    res.json(users);
}


export const getWeatherAPI = (req, res) => {
    let reqCount = req.app.get("weatherRequestCount");
    let weather = { city: "Kyiv", temperature: Math.floor(Math.random() * 31) };

    if (reqCount === 0) weather = { city: "Kyiv", temperature: 12 };
    reqCount++;
    req.app.set("weatherRequestCount", reqCount); // reset on server restart only

    res.json(weather);
}


export const getGalleryAPI = (req, res) => {
    fs.readdir(path.join(__dirname, "gallery"), (err, files) => {  // 500 internal server err
        if (err) return res.status(500).json({ error: "Something went wrong while reading gallery" });

        const extImg = [".jpeg", ".gif", ".png", ".jpg", ".svg", ".webp"];
        const images = files.filter(file => extImg.includes(path.extname(file).toLowerCase()));
        // path.extname() - Return the extension of the path, from the last '.' to end of string in the last portion of the path. 

        res.json(images); // array of file names
    });
}