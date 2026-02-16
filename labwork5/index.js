import express from "express";
import path from "path";
import { getUsersAPI, getWeatherAPI, getGalleryAPI } from "./server/controllers.js"

const __dirname = path.resolve(); // absolute path - need to add manually because it's not CommonJS import
const PORT = process.env.PORT ?? 4200; // can set port in cmd: set PORT=value && node index.js
const app = express();

/* a) */
// default - index.html; if manually set route for sending html - res.sendFile(path.join(__dirname, "public", "index.html"))
// if I had file "name.html" in this folder - could get on localhost:4200/name.html
app.use("/", express.static(path.join(__dirname, "public"))); // path.join -> make path correctly on any OS
app.use("/gallery", express.static(path.join(__dirname, "gallery"))); // get access to folder files

app.set("weatherRequestCount", 0);
app.get("/api/users", getUsersAPI);
app.get("/api/weather", getWeatherAPI);
app.get("/api/gallery", getGalleryAPI);

app.listen(PORT, () => {
    console.log(`started on port ${PORT}`);
});