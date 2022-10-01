import { WebSocketServer } from 'ws';
import {randomBytes} from "node:crypto";

const tokenSize = 64;

const wss = new WebSocketServer({ port: 2137 });

let logins = {};

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log(typeof(data));
        console.log('received: %s', data);
        data = data.toString();
        const opcode = data.split(".")[0];
        const content = data.split(".").slice(1).join(".");
        switch(opcode)
        {
            case "0":
                if(logins[content] != undefined && logins[content]["ip"] != ws._socket.remoteAddress)
                    ws.close();
                const token = randomBytes(tokenSize).toString("base64");
                logins[content] = {
                    "ip": ws._socket.remoteAddress,
                    "token": token
                }
                ws.send(`1.${token}`);
                break;
        }
    });

    ws.once("close", () => {
    })
});