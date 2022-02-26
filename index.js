require("dotenv").config();
const server = require("./utils/server")

const app = server()

const http = require("http").createServer(app);
http.listen(process.env.SERVER_PORT, () => {
    console.log("listening on *:" + process.env.SERVER_PORT);
});