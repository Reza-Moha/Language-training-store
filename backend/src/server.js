const express = require("express");
const http = require("http");
module.exports = class Application{
    #app = express();
    #PORT;
    constructor(port){
        this.#PORT = port;
        this.createServer(port)
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server running on http://localhost:${this.#PORT}`);
        });
    }
}