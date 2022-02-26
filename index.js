require("dotenv").config();
const server = require("./utils/server")

const app = server()

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => {
    console.log("listening on *:" + process.env.PORT);
});